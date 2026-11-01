param(
    [Parameter(Mandatory = $true)]
    [string]$Root,
    [switch]$DryRun
)

if (-not (Test-Path -LiteralPath $Root -PathType Container)) {
    Write-Error "Folder not found: $Root"
    exit
}

$Root = (Resolve-Path -LiteralPath $Root).Path
$changedFiles = 0
$changedLinks = 0

$dirs = Get-ChildItem -LiteralPath $Root -Directory -Recurse

foreach ($dir in $dirs) {
    $files = Get-ChildItem -LiteralPath $dir.FullName -Filter *.html -File
    foreach ($file in $files) {
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $hasBom = $bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF
        
        if ($hasBom) {
            $enc = New-Object System.Text.UTF8Encoding($true)
        } else {
            $enc = New-Object System.Text.UTF8Encoding($false)
        }

        $content = [System.IO.File]::ReadAllText($file.FullName, $enc)
        $originalContent = $content

        # 1. Абсолютные ссылки на ваш домен с дублированием папки
        # https://item1000-collab.github.io/ai/events/20260815-peter-in-uk/20260815-peter-in-uk/file.pdf
        # -> file.pdf
        $patternAbs = 'https?://item1000-collab\.github\.io/(?:[^/"]+/)+(?<file>[^"/]+\.\w+)'

        # 2. Относительные ссылки с дублированием папки
        # ../../events/20260815-peter-in-uk/20260815-peter-in-uk/file.pdf
        # -> file.pdf
        $patternRel = '(?:\.\./)+(?:[^/"]+/)+(?<file>[^"/]+\.\w+)'

        # 3. Ссылки с дублированием папки в корне сайта
        # /ai/events/20260815-peter-in-uk/20260815-peter-in-uk/file.pdf
        # -> file.pdf
        $patternRoot = '/(?:[^/"]+/)+(?<file>[^"/]+\.\w+)'

        # Применяем замены (осторожно, чтобы не задеть текст, только href/src)
        # Мы ищем внутри атрибутов href="..." или src="..."
        $newContent = [regex]::Replace($content, '(?<=(?:href|src)\s*=\s*["''])(https?://item1000-collab\.github\.io/(?:[^/"]+/)+)(?<file>[^"/]+\.\w+)', '${file}')
        $newContent = [regex]::Replace($newContent, '(?<=(?:href|src)\s*=\s*["''])((?:\.\./)+(?:[^/"]+/)+)(?<file>[^"/]+\.\w+)', '${file}')
        $newContent = [regex]::Replace($newContent, '(?<=(?:href|src)\s*=\s*["''])(/(?:[^/"]+/)+)(?<file>[^"/]+\.\w+)', '${file}')

        # 4. Специальное правило для хаба (как в index.html)
        # Если есть текст "Peter in the UK (1)" и ссылка на index.html, меняем на index-1.html
        if ($newContent -match 'Peter in the UK \(1\)') {
            $newContent = $newContent -replace 'href="index\.html"', 'href="index-1.html"'
        }

        if ($newContent -ne $originalContent) {
            Write-Host ("Changed: {0}" -f $file.FullName) -ForegroundColor Cyan
            if (-not $DryRun) {
                [System.IO.File]::WriteAllText($file.FullName, $newContent, $enc)
            }
            $script:changedFiles++
        }
    }
}

Write-Host ""
Write-Host ("Files changed: {0}" -f $changedFiles) -ForegroundColor Green
if ($DryRun) { Write-Host "(DryRun mode - files not saved)" -ForegroundColor Yellow }