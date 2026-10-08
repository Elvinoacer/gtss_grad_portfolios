#!/usr/bin/env python3
"""Download searched images into public/images with clean names + report dimensions."""
import json, os, subprocess, sys

IMG_DIR = "/home/z/my-project/scripts/img"
OUT_DIR = "/home/z/my-project/public/images"
os.makedirs(OUT_DIR, exist_ok=True)

keys = [f[:-5] for f in sorted(os.listdir(IMG_DIR)) if f.endswith(".json")]
report = []
for key in keys:
    path = os.path.join(IMG_DIR, f"{key}.json")
    try:
        with open(path) as fh:
            data = json.load(fh)
    except Exception as e:
        report.append((key, "JSON-FAIL", str(e)))
        continue
    if not data.get("success") or not data.get("results"):
        report.append((key, "NO-RESULTS", data.get("error", "empty")))
        continue
    # pick result with reasonable width, prefer landscape >= 800px wide
    best = None
    for r in data["results"]:
        try:
            w = int(str(r.get("original_width", "0")).replace("px", ""))
            h = int(str(r.get("original_height", "0")).replace("px", ""))
        except Exception:
            w = h = 0
        if w >= 800 and w > h:
            best = r
            break
    if best is None:
        best = data["results"][0]
    url = best["original_url"]
    ext = ".jpg"
    if ".png" in url.lower():
        ext = ".png"
    elif ".webp" in url.lower():
        ext = ".webp"
    out = os.path.join(OUT_DIR, f"{key}{ext}")
    rc = subprocess.run(["curl", "-sL", "--max-time", "60", "-o", out, url]).returncode
    size = os.path.getsize(out) if os.path.exists(out) else 0
    status = "OK" if rc == 0 and size > 15000 else "DL-FAIL"
    report.append((key, status, f"{best.get('original_width')}x{best.get('original_height')}", f"{size//1024}KB", url))

for r in report:
    print(" | ".join(str(x) for x in r))
