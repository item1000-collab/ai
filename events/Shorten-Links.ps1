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

# Ищем в тексте:
# 1. https://item1000-collab.github.io/ + любые папки + файл
# 2. ../../ + любые папки + файл
# Заменяем на просто имя файла
$patternAbs = 'https?://item1000-collab\.github\.io/(?:[^"\s''\)]+/)+(?<file>[^"\s''\)]+)'
$patternRel = '(?:\.\./)+(?:[^"\s''\)]+/)+(?<file>[^"\s''\)]+)'

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

        # Считаем замены
        $matchesAbs = [regex]::Matches($content, $patternAbs)
        $matchesRel = [regex]::Matches($content, $patternRel)
        
        $totalLinks = $matchesAbs.Count + $matchesRel.Count
        if ($totalLinks -eq 0) { continue }

        # Меняем
        $newContent = [regex]::Replace($content, $patternAbs, '${file}')
        $newContent = [regex]::Replace($newContent, $patternRel, '${file}')

        Write-Host ("Changed: {0} (links: {1})" -f $file.FullName, $totalLinks) -ForegroundColor Cyan

        if (-not $DryRun) {
            [System.IO.File]::WriteAllText($file.FullName, $newContent, $enc)
        }

        $script:changedFiles++
        $script:changedLinks += $totalLinks
    }
}

Write-Host ""
Write-Host ("Files changed: {0}; Links shortened: {1}" -f $changedFiles, $changedLinks) -ForegroundColor Green
if ($DryRun) { Write-Host "(DryRun mode - files not saved)" -ForegroundColor Yellow }