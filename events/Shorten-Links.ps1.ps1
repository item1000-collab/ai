<#
.SYNOPSIS
    Укорачивает относительные ссылки в HTML-файлах внутри подпапок.
.DESCRIPTION
    В файлах *.html, лежащих в подпапках указанной корневой папки,
    из значений href="..." и src="..." удаляются ведущие сегменты пути
    (имена подпапок). Например: sub2/page.html -> page.html
.PARAMETER Root
    Корневая папка, внутри которой ищем подпапки с html-файлами.
.PARAMETER DryRun
    Только показать, что будет изменено, без записи.
#>
param(
    [Parameter(Mandatory = $true)]
    [string]$Root,

    [switch]$DryRun
)

# Проверка существования корневой папки
if (-not (Test-Path -LiteralPath $Root -PathType Container)) {
    throw "Папка не найдена: $Root"
}

$Root = (Resolve-Path -LiteralPath $Root).Path

# Регулярка: захватываем атрибут и начало значения, затем убираем
# все ведущие сегменты вида "segment/" (минимум один).
# Не трогает: "http://", "https://", "//host", "../", "./", "#...", "mailto:..."
$pattern = '(?P<attr>\b(?:href|src)\s*=\s*["''])(?!https?://|//|\./|\.\./|#|mailto:|tel:|javascript:)(?:[^"/''#?]+/)+'

$changedFiles = 0
$changedLinks = 0

Get-ChildItem -LiteralPath $Root -Directory -Recurse | ForEach-Object {
    $subfolder = $_
    Get-ChildItem -LiteralPath $subfolder.FullName -Filter *.html -File | ForEach-Object {
        $file = $_

        # Определяем кодировку: BOM -> UTF8, иначе пытаемся UTF8, иначе Default
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $hasBom = $bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF
        $enc = if ($hasBom) { New-Object System.Text.UTF8Encoding($true) } else { New-Object System.Text.UTF8Encoding($false) }

        $content = [System.IO.File]::ReadAllText($file.FullName, $enc)

        # Считаем замены для отчёта
        $matches = [regex]::Matches($content, $pattern)
        if ($matches.Count -eq 0) { return }

        $newContent = [regex]::Replace($content, $pattern, '${attr}')

        Write-Host ("{0}  (замен: {1})" -f $file.FullName, $matches.Count) -ForegroundColor Cyan

        if (-not $DryRun) {
            [System.IO.File]::WriteAllText($file.FullName, $newContent, $enc)
        }

        $script:changedFiles++
        $script:changedLinks += $matches.Count
    }
}

Write-Host ""
Write-Host ("Файлов изменено: {0}; ссылок укорочено: {1}" -f $changedFiles, $changedLinks) -ForegroundColor Green
if ($DryRun) { Write-Host "(режим DryRun — файлы не записаны)" -ForegroundColor Yellow }