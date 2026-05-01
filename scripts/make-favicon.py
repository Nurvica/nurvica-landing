from PIL import Image
import os

src = "files-2/nurvica-logo-transparent-4k .png"
img = Image.open(src).convert("RGBA")
w, h = img.size

def is_content(px):
    r, g, b, a = px
    if a < 10:
        return False
    return not (r > 240 and g > 240 and b > 240)

pixels = img.load()

# Build a per-row content count to find content bands and gaps
row_has_content = [False] * h
for y in range(h):
    for x in range(w):
        if is_content(pixels[x, y]):
            row_has_content[y] = True
            break

# Find first content band (the emblem) and the gap before the wordmark
top = None
emblem_bottom = None
in_band = False
for y in range(h):
    if row_has_content[y] and top is None:
        top = y
        in_band = True
    elif in_band and not row_has_content[y]:
        # check for a sustained gap (>= 30 empty rows means we left the emblem)
        gap = 0
        for yy in range(y, min(y + 60, h)):
            if not row_has_content[yy]:
                gap += 1
            else:
                break
        if gap >= 30:
            emblem_bottom = y
            break

if emblem_bottom is None:
    emblem_bottom = h

# Find horizontal extent of the emblem only (rows top..emblem_bottom)
left, right = w, 0
for y in range(top, emblem_bottom):
    for x in range(w):
        if is_content(pixels[x, y]):
            if x < left: left = x
            break
    for x in range(w - 1, -1, -1):
        if is_content(pixels[x, y]):
            if x > right: right = x
            break

# Square crop centered on the emblem
ew = right - left
eh = emblem_bottom - top
side = max(ew, eh)
cx = (left + right) // 2
cy = (top + emblem_bottom) // 2
half = side // 2 + 20  # small padding
crop_box = (max(0, cx - half), max(0, cy - half),
            min(w, cx + half), min(h, cy + half))
emblem = img.crop(crop_box)

# Recolor to white, preserve smooth edges via alpha
ew2, eh2 = emblem.size
recolored = Image.new("RGBA", (ew2, eh2), (255, 255, 255, 0))
src_pix = emblem.load()
dst_pix = recolored.load()
for y in range(eh2):
    for x in range(ew2):
        r, g, b, a = src_pix[x, y]
        if a < 10 or (r > 240 and g > 240 and b > 240):
            dst_pix[x, y] = (255, 255, 255, 0)
        else:
            darkness = 255 - min(r, g, b)
            dst_pix[x, y] = (255, 255, 255, max(a, darkness))

# Make it a square canvas
sq = max(ew2, eh2)
canvas = Image.new("RGBA", (sq, sq), (255, 255, 255, 0))
canvas.paste(recolored, ((sq - ew2) // 2, (sq - eh2) // 2), recolored)

# Save outputs
canvas.resize((512, 512), Image.LANCZOS).save("app/icon.png", "PNG")
canvas.resize((180, 180), Image.LANCZOS).save("app/apple-icon.png", "PNG")
canvas.save("app/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

print(f"emblem band rows: {top}..{emblem_bottom}")
print(f"crop box: {crop_box} -> emblem size {emblem.size}")
print("wrote app/icon.png, app/favicon.ico, app/apple-icon.png")
