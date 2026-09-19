const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const previewsDir = path.join(__dirname, '../public/previews');
const tempDir = path.join(__dirname, 'mockup_htmls');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
if (!fs.existsSync(previewsDir)) fs.mkdirSync(previewsDir, { recursive: true });

const moreMockups = [
  {
    slug: 'bait-ul-kutub',
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  body { background: #0f172a; color: #f8fafc; height: 800px; padding: 24px; display: flex; flex-direction: column; overflow: hidden; }
  .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 16px; }
  .logo { font-size: 20px; font-weight: 800; color: #38bdf8; display: flex; align-items: center; gap: 8px; }
  .search-bar { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 10px 16px; width: 440px; font-size: 13px; color: #94a3b8; display: flex; align-items: center; gap: 10px; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 24px; }
  .card { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 20px; }
  .badge { background: #0369a1; color: #bae6fd; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
  .title { font-size: 16px; font-weight: 700; margin-top: 10px; }
  .author { font-size: 12px; color: #94a3b8; margin-top: 4px; }
  .status { margin-top: 16px; font-size: 11px; font-weight: 600; color: #34d399; }
</style>
</head>
<body>
  <div class="header">
    <div class="logo">📚 Bait-ul-Kutub LMS</div>
    <div class="search-bar">🔍 Ask AI: "Find advanced distributed systems or AI agent design books..."</div>
    <div style="font-size: 12px; color: #38bdf8; font-weight: 600;">PostgreSQL & Prisma ORM Active</div>
  </div>
  <div class="grid">
    <div class="card">
      <span class="badge">AI Semantic Match (98%)</span>
      <div class="title">Designing Data-Intensive Applications</div>
      <div class="author">Martin Kleppmann · Available in Library</div>
      <div class="status">🟢 Available on Shelf · Queue: 0</div>
    </div>
    <div class="card">
      <span class="badge">Computer Science</span>
      <div class="title">Structure and Interpretation of Computer Programs</div>
      <div class="author">Harold Abelson & Gerald Jay Sussman</div>
      <div class="status">🟡 On Loan · Due in 3 Days</div>
    </div>
    <div class="card">
      <span class="badge">Robotics & AI</span>
      <div class="title">Probabilistic Robotics & Kinematics</div>
      <div class="author">Sebastian Thrun, Wolfram Burgard</div>
      <div class="status">🟢 Available on Shelf · Queue: 1</div>
    </div>
  </div>
</body>
</html>`
  },
  {
    slug: 'humanoid-robotics',
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  body { background: #030712; color: #f9fafb; height: 800px; padding: 24px; display: flex; flex-direction: column; overflow: hidden; }
  .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1f2937; padding-bottom: 16px; }
  .logo { font-size: 20px; font-weight: 800; color: #60a5fa; display: flex; align-items: center; gap: 8px; }
  .canvas-area { margin-top: 20px; background: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 24px; flex: 1; display: flex; flex-direction: column; }
  .node-flow { display: flex; justify-content: space-around; align-items: center; margin-top: 40px; }
  .ros-node { background: #1f2937; border: 2px solid #3b82f6; border-radius: 8px; padding: 18px 24px; text-align: center; }
  .topic-line { color: #9ca3af; font-size: 11px; font-family: monospace; }
</style>
</head>
<body>
  <div class="header">
    <div class="logo">🤖 Physical AI & Humanoid Robotics</div>
    <div style="font-size: 12px; color: #10b981; font-weight: 600;">ROS 2 Galactic Graph Active</div>
  </div>
  <div class="canvas-area">
    <div style="font-size: 14px; font-weight: 700; color: #93c5fd;">Interactive ROS 2 Publisher-Subscriber Kinematics Visualizer</div>
    <div class="node-flow">
      <div class="ros-node">
        <div style="font-weight: 700; color: #60a5fa;">/joint_state_publisher</div>
        <div style="font-size: 11px; color: #9ca3af; margin-top: 4px;">Angle: θ1=42°, θ2=-18°</div>
      </div>
      <div class="topic-line">── /joint_trajectory ──▶</div>
      <div class="ros-node">
        <div style="font-weight: 700; color: #10b981;">/kinematics_solver</div>
        <div style="font-size: 11px; color: #9ca3af; margin-top: 4px;">Inverse Kinematics Loop (100Hz)</div>
      </div>
      <div class="topic-line">── /effort_controller ──▶</div>
      <div class="ros-node">
        <div style="font-weight: 700; color: #f59e0b;">/actuator_hardware</div>
        <div style="font-size: 11px; color: #9ca3af; margin-top: 4px;">Torque Execution Matrix</div>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    slug: 'comforty',
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  body { background: #f8fafc; color: #0f172a; height: 800px; padding: 24px; display: flex; flex-direction: column; overflow: hidden; }
  .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; }
  .brand { font-size: 24px; font-weight: 800; color: #0284c7; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 24px; }
  .card { background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; }
  .thumb { height: 180px; background: #e0f2fe; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 40px; }
  .item-title { font-size: 16px; font-weight: 700; margin-top: 12px; }
  .item-price { font-size: 18px; font-weight: 800; color: #0284c7; margin-top: 6px; }
</style>
</head>
<body>
  <div class="header">
    <div class="brand">Comforty.</div>
    <div style="font-size: 12px; font-weight: 600; color: #64748b;">Sanity CMS · GROQ Pipeline · Persistent Cart</div>
  </div>
  <div class="grid">
    <div class="card">
      <div class="thumb">🪑</div>
      <div class="item-title">Ergonomic Library Lounge Armchair</div>
      <div class="item-price">$149.00</div>
    </div>
    <div class="card">
      <div class="thumb">🛋️</div>
      <div class="item-title">Nordic Minimalist 3-Seater Sofa</div>
      <div class="item-price">$380.00</div>
    </div>
    <div class="card">
      <div class="thumb">🪴</div>
      <div class="item-title">Solid Teak Wood Dining Chair</div>
      <div class="item-price">$89.00</div>
    </div>
  </div>
</body>
</html>`
  },
  {
    slug: 'resume-builder',
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  body { background: #18181b; color: #fafafa; height: 800px; padding: 24px; display: flex; flex-direction: column; overflow: hidden; }
  .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #27272a; padding-bottom: 16px; }
  .split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 20px; flex: 1; }
  .editor { background: #27272a; border-radius: 8px; padding: 20px; }
  .preview { background: white; color: black; border-radius: 8px; padding: 24px; font-family: Georgia, serif; }
</style>
</head>
<body>
  <div class="header">
    <div style="font-weight: 800; font-size: 20px; color: #fbbf24;">⚡ Reactive Resume Builder</div>
    <div style="font-size: 12px; color: #a1a1aa;">Vanilla JS DOM Engine · Print CSS Architecture</div>
  </div>
  <div class="split">
    <div class="editor">
      <div style="font-weight: 700; font-size: 13px; color: #d4d4d8;">INPUT CONTROLS (Live DOM Sync)</div>
      <div style="margin-top: 12px; background: #18181b; padding: 10px; border-radius: 6px; font-size: 12px; color: #a1a1aa;">Candidate Name: Muhammad Talha Shaikh</div>
      <div style="margin-top: 8px; background: #18181b; padding: 10px; border-radius: 6px; font-size: 12px; color: #a1a1aa;">Job Title: Junior Full-Stack & AI Engineer</div>
    </div>
    <div class="preview">
      <h2 style="font-size: 20px; text-transform: uppercase;">Muhammad Talha Shaikh</h2>
      <p style="font-size: 12px; color: #555; margin-top: 4px;">Junior Full-Stack & AI Engineer · Karachi, Pakistan</p>
      <hr style="margin: 10px 0; border: 0.5px solid #ccc;">
      <h4 style="font-size: 12px; text-transform: uppercase;">Professional Summary</h4>
      <p style="font-size: 11px; margin-top: 4px; line-height: 1.4;">High-velocity engineer specializing in Next.js 16, TypeScript, Python/FastAPI, and production RAG SaaS.</p>
    </div>
  </div>
</body>
</html>`
  }
];

for (const mockup of moreMockups) {
  const htmlFile = path.join(tempDir, `${mockup.slug}.html`);
  const pngFile = path.join(previewsDir, `${mockup.slug}.png`);
  fs.writeFileSync(htmlFile, mockup.html, 'utf8');
  console.log(`Rendering ${mockup.slug}.png...`);
  try {
    const cmd = `"${edgePath}" --headless --disable-gpu --window-size=1280,800 --screenshot="${pngFile}" "file:///${htmlFile.replace(/\\\\/g, '/')}"`;
    execSync(cmd, { timeout: 15000 });
    const stats = fs.statSync(pngFile);
    console.log(`✓ Rendered ${mockup.slug}.png (${stats.size} bytes)`);
  } catch (err) {
    console.error(`Failed rendering ${mockup.slug}: ${err.message}`);
  }
}
console.log('All project previews rendered successfully!');
