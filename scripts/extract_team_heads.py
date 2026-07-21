from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

out = Path(r"C:\Projects\dizzat\megalodome\web\public\images\team")
shot = Image.open(
    r"C:\Users\Administrator\AppData\Local\hermes\profiles\trading\cache\images\img_9d17431eab60.jpg"
).convert("RGB")
a = np.asarray(shot).astype(np.float32)
h, w, _ = a.shape
g = a.mean(axis=2)
gx = np.abs(np.diff(g, axis=1, prepend=g[:, :1]))
gy = np.abs(np.diff(g, axis=0, prepend=g[:1, :]))
edge = gx + gy

candidates = []
for r in range(32, 50, 2):
    yy, xx = np.mgrid[-r : r + 1, -r : r + 1]
    mask = (xx * xx + yy * yy) <= (r * r)
    ring = ((xx * xx + yy * yy) <= (r * r)) & ((xx * xx + yy * yy) >= (r - 3) ** 2)
    for cy in range(r + 5, h - r - 5, 3):
        for cx in range(r + 5, w - r - 5, 3):
            patch = g[cy - r : cy + r + 1, cx - r : cx + r + 1]
            if patch.shape != (2 * r + 1, 2 * r + 1):
                continue
            interior = patch[mask]
            mean = float(interior.mean())
            std = float(interior.std())
            if mean > 230 or mean < 35:
                continue
            if std < 15:
                continue
            e = edge[cy - r : cy + r + 1, cx - r : cx + r + 1]
            score = float(e[ring].mean() * std)
            candidates.append((score, cx, cy, r, mean, std))

candidates.sort(reverse=True)
picked = []
for cand in candidates:
    s, cx, cy, r, m, st = cand
    if any((cx - px) ** 2 + (cy - py) ** 2 < (r + pr) ** 2 * 0.45 for _, px, py, pr, _, _ in picked):
        continue
    picked.append(cand)
    if len(picked) >= 10:
        break

print("picked", [(int(s), cx, cy, r, round(m, 1)) for s, cx, cy, r, m, st in picked])

ordered = sorted(picked[:6], key=lambda t: (t[2] // 140, t[1]))
print("ordered", [(cx, cy, r) for _, cx, cy, r, _, _ in ordered])

dbg = shot.copy()
dr = ImageDraw.Draw(dbg)
for i, (s, cx, cy, r, m, st) in enumerate(ordered):
    dr.ellipse((cx - r, cy - r, cx + r, cy + r), outline=(255, 0, 0), width=3)
    dr.text((cx - 10, cy - r - 14), str(i), fill=(255, 0, 0))
dbg.save(out / "detect-debug.jpg", quality=90)

names = [
    "bertrand-quentin",
    "annie-bergevin",
    "alain-desrochers",
    "jules-leger",
    "nick-badyal",
    "brad-blazar",
]

for i, name in enumerate(names):
    if i >= len(ordered):
        break
    s, cx, cy, r, m, st = ordered[i]
    R = int(r * 1.2)
    box = (max(0, cx - R), max(0, cy - R), min(w, cx + R), min(h, cy + R))
    crop = shot.crop(box).resize((400, 400), Image.Resampling.LANCZOS)
    mask = Image.new("L", (400, 400), 0)
    ImageDraw.Draw(mask).ellipse((8, 8, 392, 392), fill=255)
    bg = Image.new("RGB", (400, 400), (20, 20, 20))
    bg.paste(crop, (0, 0), mask)
    bg.save(out / f"{name}.jpg", quality=94)
    rgba = crop.convert("RGBA")
    rgba.putalpha(mask)
    rgba.save(out / f"{name}.png")
    print("saved", name, box)
