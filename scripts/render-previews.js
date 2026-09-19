const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const previewsDir = path.join(__dirname, '../public/previews');
const tempDir = path.join(__dirname, 'mockup_htmls');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
if (!fs.existsSync(previewsDir)) fs.mkdirSync(previewsDir, { recursive: true });

const mockups = [
  {
    slug: 'flow-creator-os',
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  body { background: #090a0f; color: #e2e8f0; height: 800px; padding: 24px; display: flex; flex-direction: column; overflow: hidden; }
  .top-nav { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 16px; }
  .logo { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 20px; color: #f8fafc; }
  .logo-badge { background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 4px 8px; border-radius: 6px; font-size: 11px; }
  .status-badge { background: #064e3b; color: #34d399; border: 1px solid #059669; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
  .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #34d399; box-shadow: 0 0 8px #34d399; }
  
  .grid-layout { display: grid; grid-template-columns: 280px 1fr 340px; gap: 20px; margin-top: 20px; flex: 1; }
  .panel { background: rgba(15, 23, 42, 0.65); border: 1px solid #1e293b; border-radius: 12px; padding: 18px; backdrop-filter: blur(12px); }
  .panel-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 14px; display: flex; justify-content: space-between; }
  
  .character-card { background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
  .character-name { font-weight: 600; font-size: 14px; color: #f1f5f9; display: flex; justify-content: space-between; }
  .token-pill { background: #1e1b4b; color: #a5b4fc; font-size: 10px; padding: 2px 6px; border-radius: 4px; border: 1px solid #4338ca; }
  .char-spec { font-size: 11px; color: #64748b; margin-top: 6px; line-height: 1.4; }

  .hero-studio { display: flex; flex-direction: column; gap: 16px; }
  .episode-banner { background: linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(88, 28, 135, 0.5)); border: 1px solid #6366f1; border-radius: 10px; padding: 18px; }
  .ep-tag { color: #818cf8; font-size: 11px; font-weight: 700; text-transform: uppercase; }
  .ep-title { font-size: 22px; font-weight: 800; color: #fff; margin-top: 4px; }
  .ep-desc { font-size: 13px; color: #cbd5e1; margin-top: 6px; }
  
  .timeline { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 10px; }
  .clip-box { background: #020617; border: 1px solid #1e293b; border-radius: 8px; padding: 12px; font-size: 11px; position: relative; }
  .clip-box.active { border-color: #ec4899; box-shadow: 0 0 12px rgba(236, 72, 153, 0.2); }
  .clip-time { color: #ec4899; font-weight: 700; }
  .clip-rule { color: #94a3b8; margin-top: 6px; font-size: 10px; }

  .ops-item { display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #020617; border-radius: 6px; margin-bottom: 8px; border: 1px solid #1e293b; font-size: 12px; }
  .platform-badge { font-weight: 600; display: flex; align-items: center; gap: 8px; }
  .ready-tag { color: #10b981; font-weight: 700; font-size: 11px; }
  .btn-bundle { background: linear-gradient(135deg, #6366f1, #a855f7); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 700; width: 100%; margin-top: 14px; cursor: pointer; text-align: center; }
</style>
</head>
<body>
  <div class="top-nav">
    <div class="logo">
      <span>🎬 FlowCreator OS</span>
      <span class="logo-badge">Gemini 2.5/3.6 Flash Core</span>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <span style="font-size: 13px; color: #94a3b8;">Season 1: The Local Betrayal</span>
      <div class="status-badge"><div class="status-dot"></div> Directing Engine Online</div>
    </div>
  </div>

  <div class="grid-layout">
    <!-- Left: Master Cast & DNA Deck -->
    <div class="panel">
      <div class="panel-title">
        <span>Master Cast DNA</span>
        <span style="color: #6366f1; font-size: 11px;">Locked Geometry</span>
      </div>
      <div class="character-card">
        <div class="character-name">
          <span>Julian Vance</span>
          <span class="token-pill">Ref Anchor #1</span>
        </div>
        <p class="char-spec">Age 38 · Charcoal trench coat · Rain-slicked noir hair · Sharp jawline token #JV84</p>
      </div>
      <div class="character-card">
        <div class="character-name">
          <span>Elena Rostova</span>
          <span class="token-pill">Ref Anchor #2</span>
        </div>
        <p class="char-spec">Age 34 · Syndicate liaison · Crimson silk lapel · Silver signet ring #ER22</p>
      </div>
      <div style="margin-top: 14px; font-size: 11px; color: #64748b;">
        🔒 Zero Face-Drift Engine Active. Multi-season biometric preservation enabled.
      </div>
    </div>

    <!-- Center: Dynamic Episode Directing Timeline -->
    <div class="panel hero-studio">
      <div class="episode-banner">
        <div class="ep-tag">Day 4 / 7 — Deep Clue Investigation (40s Dynamic Arc)</div>
        <div class="ep-title">The Boardroom Wiretap Incident</div>
        <p class="ep-desc">Automated Temporal Choreography: Single-speaker isolation with acoustic room-tone matching and eyeline cut rule.</p>
      </div>

      <div style="font-size: 12px; font-weight: 700; color: #cbd5e1; margin-top: 6px;">
        10s Motion Directives & Match-Cut Sequence:
      </div>

      <div class="timeline">
        <div class="clip-box active">
          <div class="clip-time">0:00 - 0:10</div>
          <div style="font-weight: 600; color: #f1f5f9; margin-top: 4px;">Opening Standoff</div>
          <div class="clip-rule">Speaker: Julian Vance<br>Silence directive: Elena</div>
        </div>
        <div class="clip-box">
          <div class="clip-time">0:10 - 0:20</div>
          <div style="font-weight: 600; color: #f1f5f9; margin-top: 4px;">Eyeline Match-Cut</div>
          <div class="clip-rule">Speaker: Elena Rostova<br>40% Forged Shares Reveal</div>
        </div>
        <div class="clip-box">
          <div class="clip-time">0:20 - 0:30</div>
          <div style="font-weight: 600; color: #f1f5f9; margin-top: 4px;">Forensic Probe</div>
          <div class="clip-rule">Close-up CCTV Timestamp<br>Room-tone continuous</div>
        </div>
        <div class="clip-box">
          <div class="clip-time">0:30 - 0:40</div>
          <div style="font-weight: 600; color: #f1f5f9; margin-top: 4px;">Cliffhanger Beat</div>
          <div class="clip-rule">Sudden Black Cut at 0:39.5s<br>Violin stinger peak</div>
        </div>
      </div>

      <div class="btn-bundle">⚡ Copy 1-Click Veo 2 & Google Flow Production Bundle</div>
    </div>

    <!-- Right: CreatorOps Hub & WhatsApp Automation -->
    <div class="panel">
      <div class="panel-title">
        <span>CreatorOps Distribution</span>
        <span style="color: #10b981; font-size: 11px;">PKT Scheduler</span>
      </div>
      <div class="ops-item">
        <div class="platform-badge">🔴 YouTube Shorts</div>
        <div class="ready-tag">SEO Meta Ready</div>
      </div>
      <div class="ops-item">
        <div class="platform-badge">🟣 Instagram Reels</div>
        <div class="ready-tag">Hashtags Built</div>
      </div>
      <div class="ops-item">
        <div class="platform-badge">⚫ TikTok Shop/Feed</div>
        <div class="ready-tag">Audio Synced</div>
      </div>
      <div class="ops-item">
        <div class="platform-badge">🔵 Facebook Video</div>
        <div class="ready-tag">Copy Optimized</div>
      </div>
      <div style="margin-top: 14px; background: #020617; border: 1px solid #1e293b; border-radius: 8px; padding: 12px;">
        <div style="font-size: 11px; font-weight: 700; color: #38bdf8;">📱 Hourly WhatsApp Alert Engine</div>
        <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">CallMeBot & Green-API gateway active. Next reminder scheduled at 08:00 PM PKT.</div>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    slug: 'volvelo',
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  body { background: #faf9f6; color: #1c1917; height: 800px; padding: 28px; display: flex; flex-direction: column; overflow: hidden; }
  .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e7e5e4; padding-bottom: 18px; }
  .brand { font-size: 26px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #1c1917; }
  .tagline { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #78716c; margin-top: 2px; }
  
  .nav-links { display: flex; gap: 24px; font-size: 13px; font-weight: 500; color: #44403c; text-transform: uppercase; letter-spacing: 0.05em; }
  .cur-selector { background: #fff; border: 1px solid #d6d3d1; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; display: flex; gap: 8px; }
  .badge-portal { background: #1c1917; color: #fafaf9; padding: 6px 14px; border-radius: 4px; font-size: 12px; font-weight: 600; }

  .hero-banner { margin-top: 24px; background: #f5f4ef; border: 1px solid #e7e5e4; border-radius: 8px; padding: 32px; display: flex; justify-content: space-between; align-items: center; }
  .hero-title { font-size: 32px; font-weight: 700; color: #1c1917; line-height: 1.2; }
  .hero-sub { font-size: 14px; color: #57534e; margin-top: 8px; max-width: 500px; line-height: 1.5; }

  .catalog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 24px; }
  .item-card { background: #fff; border: 1px solid #e7e5e4; border-radius: 8px; padding: 18px; display: flex; flex-direction: column; }
  .origin-tag { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #a16207; }
  .item-name { font-size: 16px; font-weight: 700; margin-top: 6px; color: #1c1917; }
  .item-maker { font-size: 12px; color: #78716c; margin-top: 2px; }
  .price-row { display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; border-top: 1px solid #f5f5f4; pt: 12px; }
  .price { font-size: 18px; font-weight: 800; color: #1c1917; }
  .btn-cart { background: #1c1917; color: #fff; border: none; padding: 6px 14px; border-radius: 4px; font-size: 12px; font-weight: 600; }
  
  .tech-footer { margin-top: auto; border-top: 1px solid #e7e5e4; padding-top: 14px; display: flex; justify-content: space-between; font-size: 11px; color: #78716c; }
  .pill-spec { background: #e7e5e4; padding: 2px 8px; border-radius: 3px; font-weight: 600; color: #44403c; }
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">VOLVELO</div>
      <div class="tagline">European Artisan Atelier Marketplace</div>
    </div>
    <div class="nav-links">
      <span>Horology</span>
      <span>Milanese Leather</span>
      <span>Cashmere</span>
      <span>Makers Portal</span>
    </div>
    <div style="display: flex; gap: 10px; align-items: center;">
      <div class="cur-selector">
        <span>CURRENCY:</span>
        <strong style="color: #0284c7;">EUR (€) / USD / PKR</strong>
      </div>
      <div class="badge-portal">Merchant Atelier: /portal</div>
    </div>
  </div>

  <div class="hero-banner">
    <div>
      <div class="hero-title">Bespoke European Craftsmanship.<br>Multi-Tenant Merchant Architecture.</div>
      <div class="hero-sub">Direct access to verified master artisans across Switzerland, Italy, and France with strict tenant isolation, dynamic currency conversion, and Clerk RBAC cloud sync.</div>
    </div>
    <div style="background: #fff; border: 1px solid #d6d3d1; padding: 16px 20px; border-radius: 6px; text-align: right;">
      <div style="font-size: 11px; font-weight: 700; color: #78716c;">TENANT REVENUE ENGINE</div>
      <div style="font-size: 24px; font-weight: 800; color: #15803d; margin-top: 2px;">€48,290.00</div>
      <div style="font-size: 11px; color: #57534e; margin-top: 2px;">85% Maker Net · 15% Platform Split</div>
    </div>
  </div>

  <div class="catalog-grid">
    <div class="item-card">
      <span class="origin-tag">Geneva, Switzerland</span>
      <div class="item-name">Vanguard Skeleton Tourbillon</div>
      <div class="item-maker">Atelier Horloger Vacheron & Cie</div>
      <div class="price-row">
        <span class="price">€3,450.00</span>
        <button class="btn-cart">Bespoke Order</button>
      </div>
    </div>

    <div class="item-card">
      <span class="origin-tag">Milan, Italy</span>
      <div class="item-name">Saddle-Stitched Calfskin Weekender</div>
      <div class="item-maker">Bottega Pelletteria Milano</div>
      <div class="price-row">
        <span class="price">€1,890.00</span>
        <button class="btn-cart">Bespoke Order</button>
      </div>
    </div>

    <div class="item-card">
      <span class="origin-tag">Lyon, France</span>
      <div class="item-name">Unbrushed Cashmere Overcoat</div>
      <div class="item-maker">Maison de Tissage Français</div>
      <div class="price-row">
        <span class="price">€2,120.00</span>
        <button class="btn-cart">Bespoke Order</button>
      </div>
    </div>
  </div>

  <div class="tech-footer">
    <div><strong>Architecture:</strong> Next.js 16 (App Router, Turbopack) · React 19 · Clerk Core 3 RBAC · Neon Serverless PostgreSQL · Prisma ORM</div>
    <div><span class="pill-spec">48 Routes</span> <span class="pill-spec">Zero-Hydration Mismatch</span> <span class="pill-spec">AEO & JSON-LD</span></div>
  </div>
</body>
</html>`
  },
  {
    slug: 'getf4f-tiktok',
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  body { background: #0a0a0f; color: #f1f5f9; height: 800px; padding: 24px; display: flex; flex-direction: column; overflow: hidden; }
  .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e1e2d; padding-bottom: 16px; }
  .logo { font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 8px; color: #38bdf8; }
  .badge-trust { background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #34d399; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; }
  
  .stats-banner { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 20px; }
  .stat-card { background: #12121e; border: 1px solid #1e1e2d; border-radius: 10px; padding: 16px; }
  .stat-label { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 600; }
  .stat-val { font-size: 24px; font-weight: 800; margin-top: 4px; color: #f8fafc; }
  
  .main-split { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; margin-top: 20px; flex: 1; }
  .card-panel { background: #12121e; border: 1px solid #1e1e2d; border-radius: 10px; padding: 18px; }
  .card-header { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin-bottom: 14px; display: flex; justify-content: space-between; }
  
  .task-row { background: #0a0a0f; border: 1px solid #27273a; border-radius: 8px; padding: 12px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
  .target-user { font-weight: 700; font-size: 14px; color: #38bdf8; }
  .cooldown-pill { background: #1e1b4b; color: #c084fc; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600; }
  .btn-verify { background: linear-gradient(135deg, #06b6d4, #3b82f6); color: white; border: none; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 700; }
  
  .proof-box { border: 2px dashed #334155; border-radius: 8px; padding: 24px; text-align: center; color: #94a3b8; font-size: 12px; }
  .heuristics-list { margin-top: 14px; font-size: 11px; color: #64748b; line-height: 1.6; }
</style>
</head>
<body>
  <div class="header">
    <div class="logo">🚀 GetF4F — TikTok Growth Exchange</div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <div class="badge-trust">🛡️ Trust Score: 100/100 (Safe)</div>
      <div style="font-size: 12px; color: #94a3b8;">Credits Balance: <strong style="color: #f59e0b;">140 Credits</strong></div>
    </div>
  </div>

  <div class="stats-banner">
    <div class="stat-card">
      <div class="stat-label">Matching Engine</div>
      <div class="stat-val" style="color: #38bdf8;">24h Cooldown</div>
      <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Anti-Shadowban Protocol</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Verification Mode</div>
      <div class="stat-val" style="color: #10b981;">AI Heuristics</div>
      <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Screenshot Proof Analysis</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Daily Streak</div>
      <div class="stat-val" style="color: #f43f5e;">7 Days 🔥</div>
      <div style="font-size: 10px; color: #64748b; margin-top: 2px;">1.5x Multiplier Active</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Ledger State</div>
      <div class="stat-val" style="color: #a855f7;">Double-Entry</div>
      <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Immutable Audit Trail</div>
    </div>
  </div>

  <div class="main-split">
    <div class="card-panel">
      <div class="card-header">
        <span>Active Reciprocal Tasks</span>
        <span style="color: #34d399; font-size: 11px;">Queue Ready</span>
      </div>
      <div class="task-row">
        <div>
          <div class="target-user">@sarah_travels_vlog</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Follow Creator + Like Recent Video</div>
        </div>
        <span class="cooldown-pill">Delayed Match: 22h Left</span>
        <button class="btn-verify">Upload Proof</button>
      </div>
      <div class="task-row">
        <div>
          <div class="target-user">@tech_breakdowns_pk</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Follow Creator (Unlocks 1K Milestone)</div>
        </div>
        <span class="cooldown-pill">Delayed Match: 18h Left</span>
        <button class="btn-verify">Upload Proof</button>
      </div>
      <div style="margin-top: 14px; font-size: 11px; color: #64748b;">
        ⚖️ Self-healing dispute engine: Freeloaders penalized -15 Trust Score. Automatic auto-ban at &lt;60.
      </div>
    </div>

    <div class="card-panel">
      <div class="card-header">AI-Assisted Proof Pipeline</div>
      <div class="proof-box">
        📸 Drop TikTok screenshot proof here or auto-analyze from camera roll
      </div>
      <div class="heuristics-list">
        ✓ Image MIME & payload validation<br>
        ✓ Heuristic profile UI detection ("Following" button state)<br>
        ✓ Target TikTok handle match confirmation<br>
        ✓ 5-day peer-reporting grace period protection
      </div>
    </div>
  </div>
</body>
</html>`
  }
];

for (const mockup of mockups) {
  const htmlFile = path.join(tempDir, `${mockup.slug}.html`);
  const pngFile = path.join(previewsDir, `${mockup.slug}.png`);
  fs.writeFileSync(htmlFile, mockup.html, 'utf8');
  console.log(`Rendering ${mockup.slug}.png via Edge headless...`);
  try {
    const cmd = `"${edgePath}" --headless --disable-gpu --window-size=1280,800 --screenshot="${pngFile}" "file:///${htmlFile.replace(/\\\\/g, '/')}"`;
    execSync(cmd, { timeout: 15000 });
    const stats = fs.statSync(pngFile);
    console.log(`✓ Rendered ${mockup.slug}.png (${stats.size} bytes)`);
  } catch (err) {
    console.error(`Failed rendering ${mockup.slug}: ${err.message}`);
  }
}
console.log('Finished rendering mockup preview PNGs!');
