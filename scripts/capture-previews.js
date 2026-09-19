const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const previewsDir = path.join(__dirname, '../public/previews');
if (!fs.existsSync(previewsDir)) {
  fs.mkdirSync(previewsDir, { recursive: true });
}

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const liveSites = [
  { slug: 'shield-tools', url: 'https://tools.talhaweb.xyz/' },
  { slug: 'botaura', url: 'https://botaura.app/' },
  { slug: 'getf4f-tiktok', url: 'https://f4f-tiktok.vercel.app/' },
  { slug: 'bait-ul-kutub', url: 'https://bait-ul-kutub.vercel.app/' },
  { slug: 'comforty', url: 'https://t-comforty2.vercel.app/' },
  { slug: 'humanoid-robotics', url: 'https://humanoid-robotic-book-eight.vercel.app/' },
  { slug: 'resume-builder', url: 'https://t-resume-build.vercel.app/' },
];

for (const site of liveSites) {
  const targetFile = path.join(previewsDir, `${site.slug}.png`);
  console.log(`Capturing ${site.slug} from ${site.url}...`);
  try {
    const cmd = `"${edgePath}" --headless --disable-gpu --window-size=1280,800 --hide-scrollbars --screenshot="${targetFile}" "${site.url}"`;
    execSync(cmd, { timeout: 20000, stdio: 'pipe' });
    if (fs.existsSync(targetFile)) {
      const stats = fs.statSync(targetFile);
      console.log(`✓ Saved ${site.slug}.png (${stats.size} bytes)`);
    } else {
      console.warn(`Warning: Screenshot file not found for ${site.slug}`);
    }
  } catch (err) {
    console.warn(`Failed capturing ${site.slug}: ${err.message}`);
  }
}

console.log('Finished capturing live preview screenshots!');
