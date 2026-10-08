/* Optimize images for web: max 1920w, quality 80, convert to jpg */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIR = '/home/z/my-project/public/images';

(async () => {
  const files = fs.readdirSync(DIR).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  for (const f of files) {
    const src = path.join(DIR, f);
    const buf = fs.readFileSync(src);
    const outName = f.replace(/\.(png|webp|jpeg)$/i, '.jpg');
    const out = path.join(DIR, outName);
    const img = sharp(buf);
    const meta = await img.metadata();
    const targetW = Math.min(1920, meta.width || 1920);
    await img
      .resize({ width: targetW, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(out + '.tmp');
    fs.renameSync(out + '.tmp', out);
    if (outName !== f) fs.unlinkSync(src);
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`${f} -> ${outName} (${targetW}w, ${kb}KB)`);
  }
})();
