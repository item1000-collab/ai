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

        # Ищем ссылки, которые начинаются с ../../zen/ИМЯ_ПАПКИ/
        # (?<attr>...) - захватывает href=" или src="
        # \.\./\.\./zen/[^/]+/ - ищет ../../zen/название_папки/
        # (?<file>[^"]+) - захватывает оставшееся имя файла до конца кавычки
        $pattern = '(?<attr>\b(?:href|src)=")(?:\.\./)+zen/[^/]+/(?<file>[^"]+")'
        
        $matches = [regex]::Matches($content, $pattern)
        
        if ($matches.Count -eq 0) { continue }

        # Заменяем на attr + file (т.е. href="01.webp")
        $newContent = [regex]::Replace($content, $pattern, '${attr}${file}')

        Write-Host ("Changed: {0} (links: {1})" -f $file.FullName, $matches.Count) -ForegroundColor Cyan

        if (-not $DryRun) {
            [System.IO.File]::WriteAllText($file.FullName, $newContent, $enc)
        }

        $script:changedFiles++
        $script:changedLinks += $matches.Count
    }
}

Write-Host ""
Write-Host ("Files changed: {0}; Links shortened: {1}" -f $changedFiles, $changedLinks) -ForegroundColor Green
if ($DryRun) { Write-Host "(DryRun mode - files not saved)" -ForegroundColor Yellow }