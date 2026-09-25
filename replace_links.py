import re
from pathlib import Path

# ==== НАСТРОЙКИ ====
# Домен + базовый путь до корня сайта на GitHub Pages:
BASE_URL = "https://item1000-collab.github.io/ai"
# ===================

ROOT = Path(".").resolve()
pattern = re.compile(re.escape(BASE_URL) + r"(/[^\s\"'<>)]*)?")

count = 0

# Ищем *.html, *.htm и файлы без расширения с именем "index"
candidates = set()
for mask in ("*.html", "*.htm"):
    candidates.update(ROOT.rglob(mask))
for p in ROOT.rglob("index"):
    if p.is_file():
        candidates.add(p)

for path in sorted(candidates):
    rel_dir = path.parent.relative_to(ROOT)
    depth = len(rel_dir.parts)
    prefix = "../" * depth if depth else "./"

    text = path.read_text(encoding="utf-8", errors="ignore")

    def repl(m):
        tail = m.group(1) or "/"
        return prefix + tail.lstrip("/")

    new = pattern.sub(repl, text)
    if new != text:
        path.write_text(new, encoding="utf-8")
        print("обновлён:", path)
        count += 1

print(f"\nГотово. Обработано файлов: {count}")