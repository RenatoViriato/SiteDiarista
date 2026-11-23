#!/usr/bin/env python3
"""Otimiza a foto do serviço Diária residencial para uso no site (web)."""
from PIL import Image

SRC = "/home/z/my-project/upload/pasted_image_1795404440190.png"
DST = "/home/z/my-project/public/servico-diaria-residencial.jpg"

im = Image.open(SRC).convert("RGB")
# Reduz para 1000px de largura (card exibe ~350-700px; sobra p/ retina)
w = 1000
h = round(im.height * w / im.width)
im = im.resize((w, h), Image.LANCZOS)
im.save(DST, "JPEG", quality=82, optimize=True, progressive=True)
print("ok:", DST, im.size)
