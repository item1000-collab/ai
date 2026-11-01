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

        # Ищем href=" или src: " или url("
        # (?:\.\./)+ - любые ../
        # (?:[^/"]+/)+ - любые папки (pcs/, zen/ и т.д.)
        # (?<file>[^"]+) - само имя файла
        $patternRel = '(?<attr>(?:href|src)\s*[=:]\s*["'']|url\(["'']?)(?:\.\./)+(?:[^/"]+/)+(?<file>[^"]+["'']|\))'
        
        # То же самое, но для полных путей https://item1000-collab.github.io/
        $patternAbs = '(?<attr>(?:href|src)\s*[=:]\s*["'']|url\(["'']?)https?://item1000-collab\.github\.io/(?:[^/"]+/)+(?<file>[^"]+["'']|\))'
        
        $matchesRel = [regex]::Matches($content, $patternRel)
        $matchesAbs = [regex]::Matches($content, $patternAbs)
        
        $totalLinks = $matchesRel.Count + $matchesAbs.Count
        if ($totalLinks -eq 0) { continue }

        $newContent = [regex]::Replace($content, $patternRel, '${attr}${file}')
        $newContent = [regex]::Replace($newContent, $patternAbs, '${attr}${file}')

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