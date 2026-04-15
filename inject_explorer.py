"""
inject_explorer.py
Inject explorer_data.json into template.html to produce public/index.html
"""
import os, sys

base = "C:/Users/user/Dropbox/ARLAB shared folder/PhD students/EladR/using ai survey/2 study 1/round 2/data/Cleaned_W2_2026-04-15"

template_path = os.path.join(base, "explorer/template.html")
json_path = os.path.join(base, "explorer_data.json")
output_path = os.path.join(base, "explorer/public/index.html")

# Read template
with open(template_path, 'r', encoding='utf-8') as f:
    template = f.read()

# Read JSON data
with open(json_path, 'r', encoding='utf-8') as f:
    json_data = f.read()

# Replace placeholder
placeholder = '/*__EXPLORER_DATA__*/null'
if placeholder not in template:
    print("ERROR: Placeholder not found in template!")
    sys.exit(1)

html = template.replace(placeholder, json_data, 1)

# Ensure output directory exists
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# Write final HTML
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)

size_kb = os.path.getsize(output_path) / 1024
print(f"Injected: {output_path}")
print(f"Size: {size_kb:.0f} KB")
print(f"Template: {len(template):,} chars")
print(f"JSON data: {len(json_data):,} chars")
print(f"Final HTML: {len(html):,} chars")
print("DONE")
