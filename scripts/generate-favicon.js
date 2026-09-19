const fs = require('fs');
const path = require('path');

// Create 32x32 icon with dark background (#14110e), amber "T" (#d97736), and green indicator (#10b981)
function createIcoBuffer(width = 32, height = 32) {
  const bpp = 32;
  const imageSize = 40 + (width * height * 4) + (Math.ceil(width / 32) * 4 * height);
  const totalSize = 6 + 16 + imageSize;
  const buf = Buffer.alloc(totalSize);

  // ICONDIR Header
  buf.writeUInt16LE(0, 0); // Reserved
  buf.writeUInt16LE(1, 2); // 1 = ICO
  buf.writeUInt16LE(1, 4); // 1 image

  // ICONDIRENTRY
  buf.writeUInt8(width === 256 ? 0 : width, 6);
  buf.writeUInt8(height === 256 ? 0 : height, 7);
  buf.writeUInt8(0, 8); // Color palette
  buf.writeUInt8(0, 9); // Reserved
  buf.writeUInt16LE(1, 10); // Color planes
  buf.writeUInt16LE(bpp, 12); // Bits per pixel
  buf.writeUInt32LE(imageSize, 14); // Size of image data
  buf.writeUInt32LE(22, 18); // Offset to image data

  // BITMAPINFOHEADER
  const dibOffset = 22;
  buf.writeUInt32LE(40, dibOffset + 0); // biSize
  buf.writeInt32LE(width, dibOffset + 4); // biWidth
  buf.writeInt32LE(height * 2, dibOffset + 8); // biHeight (double height for XOR + AND masks)
  buf.writeUInt16LE(1, dibOffset + 12); // biPlanes
  buf.writeUInt16LE(bpp, dibOffset + 14); // biBitCount
  buf.writeUInt32LE(0, dibOffset + 16); // biCompression (BI_RGB)
  buf.writeUInt32LE(imageSize - 40, dibOffset + 20); // biSizeImage
  buf.writeInt32LE(0, dibOffset + 24); // biXPelsPerMeter
  buf.writeInt32LE(0, dibOffset + 28); // biYPelsPerMeter
  buf.writeUInt32LE(0, dibOffset + 32); // biClrUsed
  buf.writeUInt32LE(0, dibOffset + 36); // biClrImportant

  // Pixel Data (BGRA, bottom-up)
  const pixelOffset = dibOffset + 40;
  
  // Colors (B, G, R, A)
  const cBg = [0x0e, 0x11, 0x14, 0xff];       // #14110e dark obsidian
  const cBorder = [0x26, 0x2f, 0x3a, 0xff];   // #3a2f26 border
  const cAccent = [0x36, 0x77, 0xd9, 0xff];   // #d97736 warm amber / terracotta
  const cAccentLight = [0x0b, 0x9e, 0xf5, 0xff]; // #f59e0b bright gold
  const cGreen = [0x81, 0xb9, 0x10, 0xff];    // #10b981 emerald pulse dot
  const cTransparent = [0, 0, 0, 0];

  for (let y = 0; y < height; y++) {
    // In BMP, row 0 is the bottom row
    const visualY = height - 1 - y;
    
    for (let x = 0; x < width; x++) {
      const idx = pixelOffset + (y * width + x) * 4;
      
      // Rounded corner radius ~ 6px
      const isCorner = 
        (x < 5 && visualY < 5 && ((5 - x) * (5 - x) + (5 - visualY) * (5 - visualY) > 25)) ||
        (x > 26 && visualY < 5 && ((x - 26) * (x - 26) + (5 - visualY) * (5 - visualY) > 25)) ||
        (x < 5 && visualY > 26 && ((5 - x) * (5 - x) + (visualY - 26) * (visualY - 26) > 25)) ||
        (x > 26 && visualY > 26 && ((x - 26) * (x - 26) + (visualY - 26) * (visualY - 26) > 25));

      if (isCorner) {
        buf.set(cTransparent, idx);
        continue;
      }

      // Border outline (1px)
      const isBorder = x === 1 || x === 30 || visualY === 1 || visualY === 30;
      if (isBorder) {
        buf.set(cBorder, idx);
        continue;
      }

      // Emerald indicator dot at bottom right (visualX 22-26, visualY 22-26)
      const dxGreen = x - 24;
      const dyGreen = visualY - 24;
      if (dxGreen * dxGreen + dyGreen * dyGreen <= 6) {
        buf.set(cGreen, idx);
        continue;
      }

      // Futuristic Monogram "T"
      // Top bar: visualY 7 to 11, x 7 to 24
      const isTopBar = (visualY >= 7 && visualY <= 11 && x >= 7 && x <= 24);
      // Stem: visualY 11 to 24, x 13 to 18
      const isStem = (visualY > 11 && visualY <= 24 && x >= 13 && x <= 18);

      if (isTopBar) {
        // Gradient top-to-bottom
        buf.set(visualY <= 8 ? cAccentLight : cAccent, idx);
      } else if (isStem) {
        buf.set(cAccent, idx);
      } else {
        // Background
        buf.set(cBg, idx);
      }
    }
  }

  // AND mask (all 0s = opaque except where alpha=0)
  const maskOffset = pixelOffset + (width * height * 4);
  for (let y = 0; y < height; y++) {
    const visualY = height - 1 - y;
    let rowMask = 0;
    for (let x = 0; x < width; x++) {
      const isCorner = 
        (x < 5 && visualY < 5 && ((5 - x) * (5 - x) + (5 - visualY) * (5 - visualY) > 25)) ||
        (x > 26 && visualY < 5 && ((x - 26) * (x - 26) + (5 - visualY) * (5 - visualY) > 25)) ||
        (x < 5 && visualY > 26 && ((5 - x) * (5 - x) + (visualY - 26) * (visualY - 26) > 25)) ||
        (x > 26 && visualY > 26 && ((x - 26) * (x - 26) + (visualY - 26) * (visualY - 26) > 25));
      
      if (isCorner) {
        rowMask |= (1 << (7 - (x % 8)));
      }
      if (x % 8 === 7 || x === width - 1) {
        buf.writeUInt8(rowMask, maskOffset + (y * 4) + Math.floor(x / 8));
        rowMask = 0;
      }
    }
  }

  return buf;
}

const icoBuf = createIcoBuffer(32, 32);
fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), icoBuf);
fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuf);
console.log('Successfully generated custom favicon.ico (32x32)!');
