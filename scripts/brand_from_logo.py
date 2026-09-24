#!/usr/bin/env python3
"""Gera assets de marca a partir de uma imagem de logo e extrai a paleta de cores.

Uso: python3 brand_from_logo.py [origem] [saida]
  origem: imagem da logo (png/jpeg, fundo branco idealmente)
          — padrão: scripts/logo-candidate-a.png
  saida:  caminho do PNG recortado — padrão: public/logo-renata.png
Saídas:
  - PNG da marca recortada (fundo transparente, canvas 512x512)
  - paleta impressa no stdout (clusters + rampa brand-50..900 em hex)
"""
import colorsys
import sys
from PIL import Image

SRC = sys.argv[1] if len(sys.argv) > 1 else "/home/z/my-project/scripts/logo-candidate-a.png"
OUT_MARK = sys.argv[2] if len(sys.argv) > 2 else "/home/z/my-project/public/logo-renata.png"

img = Image.open(SRC).convert("RGBA")
print(f"original: {img.size}")

# ── 1. Recorte: bounding box de pixels não-brancos ─────────────────────────
rgb = img.convert("RGB")
w, h = rgb.size
pixels = rgb.load()

min_x, min_y, max_x, max_y = w, h, 0, 0
for y in range(h):
    for x in range(w):
        r, g, b = pixels[x, y]
        if not (r > 242 and g > 242 and b > 242):  # não-branco
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y

print(f"bbox: ({min_x},{min_y})-({max_x},{max_y})")
mark = img.crop((min_x, min_y, max_x + 1, max_y + 1))

# ── 2. Branco → transparente (rampa suave para evitar serrilhado) ─────────
mark_rgba = mark.load()
mw, mh = mark.size
for y in range(mh):
    for x in range(mw):
        r, g, b, a = mark_rgba[x, y]
        # brilho; quase-branco vira transparente com transição 225→250
        bright = (r + g + b) / 3
        if bright >= 250 and a > 0:
            mark_rgba[x, y] = (r, g, b, 0)
        elif bright >= 225:
            alpha = int(255 * (250 - bright) / 25)
            mark_rgba[x, y] = (r, g, b, min(a, alpha))

# ── 3. Canvas quadrado 512 com padding de 6% ───────────────────────────────
pad = int(512 * 0.06)
scale = min((512 - 2 * pad) / mw, (512 - 2 * pad) / mh)
new_w, new_h = max(1, int(mw * scale)), max(1, int(mh * scale))
mark_resized = mark.resize((new_w, new_h), Image.LANCZOS)

canvas = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
canvas.paste(mark_resized, ((512 - new_w) // 2, (512 - new_h) // 2), mark_resized)
canvas.save(OUT_MARK)
print(f"salvo: {OUT_MARK} (marca {new_w}x{new_h} em canvas 512x512)")

# ── 4. Extração de paleta (quantização sobre pixels opacos) ────────────────
opaque = [(r, g, b) for y in range(mh) for x in range(mw)
          for (r, g, b, a) in [mark_rgba[x, y]] if a > 200]
print(f"pixels opacos p/ paleta: {len(opaque)}")

q = Image.new("RGB", (len(opaque), 1))
q.putdata(opaque)
palette = q.quantize(colors=8, method=Image.MEDIANCUT).convert("RGB").getcolors(8)
palette.sort(reverse=True)  # por contagem

def hexc(rgb):
    return "#{:02x}{:02x}{:02x}".format(*rgb)

def hsl_of(rgb):
    r, g, b = [v / 255 for v in rgb]
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    return h * 360, s, l

clusters = []
for count, rgb_val in palette:
    hh, ss, ll = hsl_of(rgb_val)
    clusters.append({"hex": hexc(rgb_val), "count": count, "h": hh, "s": ss, "l": ll})
    print(f"  cluster {hexc(rgb_val)}  n={count:>7}  h={hh:6.1f}  s={ss:.2f}  l={ll:.2f}")

# primária: cor mais frequente com saturação alta que NÃO seja dourada
primary = None
gold = None
for c in clusters:
    if c["s"] < 0.18 or c["l"] > 0.92 or c["l"] < 0.08:
        continue
    if 30 <= c["h"] <= 65:  # faixa dourada
        if gold is None:
            gold = c
    else:
        if primary is None:
            primary = c
print(f"\nPRIMÁRIA: {primary['hex'] if primary else 'N/D'}")
print(f"DOURADO:  {gold['hex'] if gold else 'N/D'}")

# ── 5. Rampa brand-50..900 a partir da primária (HSL) ──────────────────────
if primary:
    H = primary["h"]
    S = min(max(primary["s"], 0.45), 0.72)
    shades = {
        50: (0.97, 0.55), 100: (0.94, 0.60), 200: (0.87, 0.70), 300: (0.78, 0.85),
        400: (0.66, 1.00), 500: (0.58, 1.00), 600: (0.50, 1.00), 700: (0.42, 1.00),
        800: (0.34, 0.95), 900: (0.28, 0.90),
    }
    print("\nRampa brand (hex):")
    for shade, (L, sf) in shades.items():
        rgb_out = tuple(round(v * 255) for v in colorsys.hls_to_rgb(H / 360, L, min(S * sf, 0.95)))
        print(f"  brand-{shade}: {hexc(rgb_out)}")
