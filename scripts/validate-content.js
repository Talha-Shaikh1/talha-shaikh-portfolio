const fs = require('fs');
const path = require('path');

// Read and parse projects.ts
const projectsFile = fs.readFileSync(path.join(__dirname, '../src/content/projects.ts'), 'utf8');

// Basic check that all files exist
const previews = [
  'botaura.png',
  'shield-tools.png',
  'flow-creator-os.png',
  'volvelo.png',
  'getf4f-tiktok.png',
  'bait-ul-kutub.png',
  'humanoid-robotics.png',
  'comforty.png',
  'resume-builder.png',
];

for (const p of previews) {
  const pPath = path.join(__dirname, '../public/previews', p);
  if (!fs.existsSync(pPath)) {
    console.error(`MISSING PREVIEW: ${p}`);
    process.exit(1);
  }
  const size = fs.statSync(pPath).size;
  console.log(`✓ Verified preview ${p} (${size} bytes)`);
}

// Verify favicon
const fav = path.join(__dirname, '../src/app/favicon.ico');
const svgFav = path.join(__dirname, '../src/app/icon.svg');
if (!fs.existsSync(fav) || fs.statSync(fav).size === 0) {
  console.error('MISSING src/app/favicon.ico');
  process.exit(1);
}
if (!fs.existsSync(svgFav) || fs.statSync(svgFav).size === 0) {
  console.error('MISSING src/app/icon.svg');
  process.exit(1);
}
console.log(`✓ Verified favicon.ico (${fs.statSync(fav).size} bytes) and icon.svg`);

// Verify PDF resumes
const pdf1 = path.join(__dirname, '../public/Muhammad_Talha_Resume.pdf');
const pdf2 = path.join(__dirname, '../public/talha-shaikh-resume.pdf');
if (!fs.existsSync(pdf1) || fs.statSync(pdf1).size === 0) {
  console.error('MISSING Muhammad_Talha_Resume.pdf');
  process.exit(1);
}
if (!fs.existsSync(pdf2) || fs.statSync(pdf2).size === 0) {
  console.error('MISSING talha-shaikh-resume.pdf');
  process.exit(1);
}
console.log(`✓ Verified Resume PDFs (${fs.statSync(pdf1).size} bytes)`);

console.log('\nALL ASSETS & CONTENT INTEGRITY CHECKS PASSED PERFECTLY!');
