#!/usr/bin/env python3
"""Recorta os assets da logo R&R (upload JPEG, fundo branco) para PNGs transparentes.

Gera:
  public/logo-renata.png    — marca da estrela com casinha (topo da logo), canvas 512x512
  public/logo-completa.png  — logo inteira (estrela + R&R + textos), canvas 512x512
  public/icon.png           — favicon 128x128 a partir da marca da estrela
"""
from PIL import Image

SRC = "/home/z/my-project/upload/be86cae1-6392-4e29-9d7b-17554ff25d34.jpeg"

img = Image.open(SRC).convert("RGBA")
W, H = img.size
px = img.load()

# Fundo branco/junto ao branco -> transparente (rampa suave p/ evitar serrilhado)
for y in range(H):
    for x in range(W):
        r, g, b, a = px[x, y]
        lum = (r + g + b) / 3
        if lum >= 247:
            px[x, y] = (r, g, b, 0)
        elif lum >= 225:
            alpha = int(255 * (247 - lum) / 22)
            px[x, y] = (r, g, b, alpha)

def bbox_nonwhite(im):
    gray = im.convert("L")
    mask = gray.point(lambda v: 255 if v < 240 else 0)
    return mask.getbbox()

def centered(im, box, canvas=512, pad_ratio=0.06):
    crop = im.crop(box)
    w, h = crop.size
    pad = int(max(w, h) * pad_ratio)
    side = max(w, h) + 2 * pad
    canvas_img = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas_img.paste(crop, ((side - w) // 2, (side - h) // 2), crop)
    return canvas_img.resize((canvas, canvas), Image.LANCZOS)

# Marca da estrela: recorte ate a folga branca entre a estrela (termina ~y509)
# e o texto "R&R" (comeca ~y546) — H*0.5 cai dentro da folga
top_half = img.crop((0, 0, W, int(H * 0.5)))
star_box = bbox_nonwhite(top_half)
star = centered(img, star_box)
# Quantiza p/ reduzir muito o tamanho (gradiente dourado suporta 256 cores)
star.quantize(colors=256, method=Image.FASTOCTREE).save(
    "/home/z/my-project/public/logo-renata.png", optimize=True)

# Logo completa
full_box = bbox_nonwhite(img)
full = centered(img, full_box)
full.quantize(colors=256, method=Image.FASTOCTREE).save(
    "/home/z/my-project/public/logo-completa.png", optimize=True)

# Favicon
star.resize((128, 128), Image.LANCZOS).quantize(
    colors=128, method=Image.FASTOCTREE).save(
    "/home/z/my-project/public/icon.png", optimize=True)

print("star_box:", star_box, "| full_box:", full_box)
print("ok: logo-renata.png (estrela), logo-completa.png, icon.png")
