# V3 Anti-Podium Target Design Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the current web application to match the target V3 "Анти-подиум" design pixel-perfectly, including the dramatic 3D podium layout, dark theme tokens, Google Fonts, quick actions, award modal, feed, and employee management.

**Architecture:** Vanilla HTML5, CSS3, and modern JavaScript (ES6+). State stored in `localStorage` and dynamic UI rendered via DOM manipulation matching the handoff specification.

**Tech Stack:** HTML5, Vanilla CSS, Vanilla JavaScript, Google Fonts (Space Grotesk, IBM Plex Mono, IBM Plex Sans).

## Global Constraints

- Pixel-perfect visual alignment with V3 design from `design/project/Рейтинг команды.dc.html`
- Do not remove existing features (data persistence, employee CRUD, award form, date filtering, toast with undo)
- Use standard Google Fonts linked in `<head>`
- Asset `assets/medal-antihero.png` used for 1st place anti-hero

---

### Task 1: Core Design System & CSS Tokens (`css/style.css`)

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Produces: Complete CSS design system with CSS custom properties (`--s-bg`, `--s-fg`, `--s-panel`, `--s-bd`, `--s-mut`, `--s-sub`, `--fbg`, `--ffg`, etc.), V3 podium styles, rest list, feed, modals, and animations.

- [ ] **Step 1: Replace `css/style.css` with the V3 design system**

Write the complete V3 CSS stylesheet containing all color tokens, typography setups, podium styles, responsive grid, modal components, and keyframe animations:

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

:root {
  /* V3 Dark Dramatic Theme (default) */
  --s-bg: #0d0d10;
  --s-fg: #e7e7ea;
  --s-mut: #6f6f7a;
  --s-sub: #9a9aa6;
  --s-panel: #16161c;
  --s-bd: #26262e;
  --s-btnbg: #17171c;
  --s-btnbd: #2a2a32;
  --s-btnfg: #c8c8d0;
  --s-tabidle: #8a8a94;
  --s-empty: #6a6a74;
  --s-toastbg: #1c1c24;
  --s-toastbd: #33333f;
  --s-toastfg: #e7e7ea;
  
  --fbg: #16161f;
  --ffg: #ececf5;
  --fbd: #2c2c40;
  --fmut: #8a8aa0;
  --finp: #101019;
  --facc: #e5b567;
  --faccfg: #101019;
  
  --accent-lime: #d7ff2e;
  --font-main: 'IBM Plex Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
  --font-heading: 'Space Grotesk', sans-serif;
}

[data-theme="light"] {
  --s-bg: #edece7;
  --s-fg: #1a1a1e;
  --s-mut: #78766d;
  --s-sub: #57554d;
  --s-panel: #ffffff;
  --s-bd: #e3e1da;
  --s-btnbg: #ffffff;
  --s-btnbd: #dddbd3;
  --s-btnfg: #45443e;
  --s-tabidle: #78766d;
  --s-empty: #9a988c;
  --s-toastbg: #ffffff;
  --s-toastbd: #dddbd3;
  --s-toastfg: #1a1a1e;
  
  --fbg: #ffffff;
  --ffg: #17171a;
  --fbd: #e4e2dc;
  --fmut: #8a8a80;
  --finp: #f6f5f2;
  --facc: #e5b567;
  --faccfg: #101019;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  min-height: 100vh;
  color: var(--s-fg);
  background: var(--s-bg);
  font-family: var(--font-main);
  transition: background .25s ease, color .25s ease;
  padding: 22px clamp(14px, 4vw, 40px) 80px;
}

::selection { background: #d7ff2e; color: #000; }

.shell {
  max-width: 1180px;
  margin: 0 auto;
}

/* HEADER */
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.eyebrow {
  font-size: 12px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--s-mut);
  font-weight: 600;
}
.page-title {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 700;
  margin-top: 6px;
}
.page-desc {
  font-size: 13.5px;
  color: var(--s-sub);
  margin-top: 4px;
  max-width: 520px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid var(--s-btnbd);
  background: var(--s-btnbg);
  color: var(--s-fg);
  transition: all .15s ease;
}
.theme-btn:hover {
  border-color: var(--s-fg);
}
.nav-tabs {
  display: inline-flex;
  gap: 4px;
  background: var(--s-btnbg);
  border: 1px solid var(--s-bd);
  border-radius: 11px;
  padding: 4px;
}
.nav-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  background: transparent;
  color: var(--s-tabidle);
  transition: all .15s ease;
}
.nav-tab.active {
  background: var(--accent-lime);
  color: #111;
}
.nav-tab-tag {
  font-size: 10px;
  opacity: .7;
  font-family: var(--font-mono);
}

/* TOOLBAR */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}
.period-tabs {
  display: inline-flex;
  gap: 4px;
  background: var(--s-btnbg);
  border: 1px solid var(--s-bd);
  border-radius: 10px;
  padding: 4px;
}
.period-tab {
  border: none;
  border-radius: 8px;
  padding: 8px 15px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  background: transparent;
  color: var(--s-tabidle);
  transition: all .15s ease;
}
.period-tab.active {
  background: var(--accent-lime);
  color: #111;
}
.period-nav {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--s-btnbd);
  background: var(--s-btnbg);
  color: var(--s-fg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.btn-icon:hover { border-color: var(--s-fg); }
.period-label {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  padding: 0 4px;
}
.btn-ghost-sm {
  background: transparent;
  border: 1px solid var(--s-btnbd);
  color: var(--s-btnfg);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.btn-ghost-sm:hover { border-color: var(--s-fg); color: var(--s-fg); }
.btn-lime {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent-lime);
  color: #111;
  border: none;
  border-radius: 10px;
  padding: 11px 18px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  transition: transform .1s ease, filter .15s ease;
}
.btn-lime:hover {
  filter: brightness(1.06);
  transform: translateY(-1px);
}

/* SCREENS */
.screen { display: none; }
.screen.active { display: block; animation: fadeIn .25s ease; }

/* PODIUM CARD (V3 Dramatic) */
.podium-card {
  background: radial-gradient(120% 90% at 50% -10%, #221a2e 0%, #101019 55%);
  border-radius: 18px;
  border: 1px solid #2a2438;
  padding: 26px 22px 24px;
  font-family: var(--font-heading);
}
.podium-header-title {
  text-align: center;
  font-size: 12px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: #8a8aa0;
  margin-bottom: 22px;
}
.podium-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 14px;
  align-items: end;
  max-width: 720px;
  margin: 0 auto 26px;
}
.podium-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.avatar-wrap {
  position: relative;
}
.medal-img {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 56px;
  height: 56px;
  object-fit: contain;
  z-index: 2;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,.4));
}
.avatar-circle {
  border-radius: 50%;
  background: #1c1c2b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
}
.rank-badge {
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  color: #101019;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
}
.podium-info { text-align: center; }
.podium-name { font-weight: 700; font-size: 14.5px; color: #ececf5; }
.podium-role { font-size: 11.5px; color: #8a8aa0; margin-top: 2px; }

.podium-stand {
  width: 100%;
  border-radius: 12px 12px 0 0;
  border-style: solid;
  border-width: 1px 1px 0 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 14px;
}
.podium-points {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 26px;
  color: #fff;
}
.podium-unit {
  font-size: 10.5px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.75);
  margin-top: 2px;
}

/* REST LIST */
.rest-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 820px;
  margin: 0 auto;
}
.rest-item {
  display: grid;
  grid-template-columns: 40px 1fr 90px 90px 40px;
  align-items: center;
  gap: 12px;
  background: #16161f;
  border: 1px solid #26263a;
  border-radius: 12px;
  padding: 11px 16px;
  font-family: var(--font-heading);
}
.rest-rank {
  font-family: var(--font-mono);
  font-weight: 700;
  color: #6a6a86;
}
.rest-user {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
}
.rest-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex: none;
  background: #1c1c2b;
  border: 1px dashed #3a3a52;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #9a9ab5;
}
.rest-name {
  font-weight: 600;
  font-size: 14px;
  color: #ececf5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rest-role { font-size: 11.5px; color: #8a8aa0; }
.rest-late {
  text-align: right;
  font-family: var(--font-mono);
  font-size: 13px;
  color: #8a8aa0;
}
.rest-points {
  text-align: right;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 16px;
  color: #ff8a8a;
}
.btn-quick-late {
  justify-self: end;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #33334a;
  background: transparent;
  color: #b6b6cc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .15s ease;
}
.btn-quick-late:hover {
  border-color: #ff8a8a;
  color: #ff8a8a;
}

/* RECENT FEED */
.recent-feed {
  max-width: 1180px;
  margin: 26px auto 0;
}
.feed-eyebrow {
  font-size: 12px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--s-mut);
  font-weight: 600;
  margin-bottom: 12px;
}
.feed-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.feed-item {
  display: flex;
  align-items: center;
  gap: 13px;
  background: var(--s-panel);
  border: 1px solid var(--s-bd);
  border-radius: 11px;
  padding: 10px 15px;
}
.feed-icon-box {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}
.feed-info { min-width: 0; flex: 1; }
.feed-title { font-size: 13.5px; color: var(--s-fg); }
.feed-sub { font-size: 11.5px; color: var(--s-sub); margin-top: 2px; }
.feed-pts {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 15px;
}
.feed-photo {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  object-fit: cover;
  flex: none;
}

/* EMPLOYEES TAB */
.employees-card {
  background: var(--s-panel);
  border: 1px solid var(--s-bd);
  border-radius: 16px;
  padding: 16px;
}
.emp-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--s-bd);
}
.emp-item:last-child { border-bottom: none; }
.emp-info-group {
  display: flex;
  align-items: center;
  gap: 12px;
}
.emp-avatar {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #1c1c2b;
  border: 1px dashed #3a3a52;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  color: var(--facc);
}
.emp-actions {
  display: flex;
  gap: 8px;
}
.btn-sm-action {
  background: transparent;
  border: 1px solid var(--s-btnbd);
  color: var(--s-fg);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.btn-sm-action:hover { border-color: var(--facc); color: var(--facc); }
.btn-sm-danger {
  background: transparent;
  border: 1px solid rgba(255,138,138,.3);
  color: #ff8a8a;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.btn-sm-danger:hover { background: rgba(255,138,138,.1); border-color: #ff8a8a; }

/* MODALS & OVERLAY */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(6,6,10,.7);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 16px;
  z-index: 100;
  overflow-y: auto;
  animation: fadeIn .18s ease;
}
.fmodal {
  width: 100%;
  max-width: 500px;
  background: var(--fbg);
  color: var(--ffg);
  border: 1px solid var(--fbd);
  border-radius: 18px;
  overflow: hidden;
  animation: pop .24s ease;
  box-shadow: 0 30px 80px rgba(0,0,0,.5);
}
.fmodal-sm { max-width: 420px; }
.fmodal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  border-bottom: 1px solid var(--fbd);
}
.fmodal-title { font-weight: 700; font-size: 18px; font-family: var(--font-heading); }
.fmodal-close {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  border: 1px solid var(--fbd);
  background: transparent;
  color: var(--fmut);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fmodal-close:hover { color: var(--ffg); border-color: var(--ffg); }
.fmodal-body {
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.ffield-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--fmut);
  margin-bottom: 9px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.facc-text { color: var(--facc); }
.famount {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 16px;
  color: var(--facc);
}
.chip-row, .type-row, .quick-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}
.chip-btn {
  padding: 7px 12px;
  border-radius: 99px;
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  border: 1px solid var(--fbd);
  background: transparent;
  color: var(--fmut);
  transition: all .15s ease;
}
.chip-btn.selected {
  border-color: var(--facc);
  background: var(--facc);
  color: var(--faccfg);
}
.type-btn {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  border: 1px solid var(--fbd);
  background: transparent;
  color: var(--fmut);
  text-align: center;
}
.type-btn.selected {
  border-color: var(--facc);
  background: var(--facc);
  color: var(--faccfg);
}
.quick-btn {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  font-weight: 700;
  font-family: var(--font-mono);
  cursor: pointer;
  border: 1px solid var(--fbd);
  background: transparent;
  color: var(--fmut);
  text-align: center;
}
.quick-btn.selected {
  border-color: var(--facc);
  background: var(--facc);
  color: var(--faccfg);
}
.finput {
  width: 100%;
  background: var(--finp);
  border: 1px solid var(--fbd);
  border-radius: 10px;
  padding: 11px 13px;
  color: var(--ffg);
  font-size: 14px;
  font-family: inherit;
  outline: none;
}
.finput:focus { border-color: var(--facc); }
.fmono { font-family: var(--font-mono); font-size: 15px; }

.upload-label {
  display: flex;
  align-items: center;
  gap: 13px;
  border: 1px dashed var(--fbd);
  border-radius: 12px;
  padding: 13px;
  cursor: pointer;
}
.upload-label:hover { border-color: var(--facc); }

.fmodal-actions {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}
.fbtn-cancel {
  flex: none;
  background: transparent;
  border: 1px solid var(--fbd);
  color: var(--fmut);
  border-radius: 11px;
  padding: 13px 20px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
}
.fbtn-cancel:hover { border-color: var(--ffg); color: var(--ffg); }
.fbtn-submit {
  flex: 1;
  background: var(--facc);
  color: var(--faccfg);
  border: none;
  border-radius: 11px;
  padding: 13px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
}
.fbtn-danger {
  flex: 1;
  background: #ff8a8a;
  color: #101019;
  border: none;
  border-radius: 11px;
  padding: 13px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
}

/* TOAST */
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--s-toastbg);
  border: 1px solid var(--s-toastbd);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  z-index: 200;
  box-shadow: 0 12px 40px rgba(0,0,0,.35);
  animation: pop .2s ease;
}
.toast-undo {
  background: transparent;
  border: none;
  color: var(--accent-lime);
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  font-family: inherit;
}

.empty-inline {
  text-align: center;
  color: var(--s-empty);
  font-size: 13.5px;
  padding: 24px;
}

/* ANIMATIONS */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes pop { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: none; } }
@keyframes riseUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
```

- [ ] **Step 2: Verify CSS formatting & syntax**

Review `css/style.css` for any syntax errors or missing rules.

---

### Task 2: Update HTML Structure (`index.html`)

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: CSS classes and ID hooks from `css/style.css`.
- Produces: V3 layout with header, podium container, rest list, recent feed, employee tab, and modal dialogs.

- [ ] **Step 1: Replace `index.html` markup**

```html
<!DOCTYPE html>
<html lang="ru" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Е-баллы — антирейтинг команды</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="shell" id="shell">

  <!-- HEADER -->
  <header class="page-header">
    <div class="header-left">
      <div class="eyebrow">Антирейтинг команды · штрафные баллы</div>
      <div class="page-title">Анти-подиум</div>
      <div class="page-desc">Пьедестал позора для топ-3 нарушителей плюс список остальных.</div>
    </div>
    <div class="header-right">
      <button class="theme-btn" id="themeToggle" title="Светлая тема" aria-label="Переключить тему">☀</button>
      <div class="nav-tabs" role="tablist" aria-label="Экраны">
        <button class="nav-tab active" data-screen="rating" role="tab" aria-selected="true">
          <span class="nav-tab-tag">01</span><span class="nav-tab-label">Рейтинг</span>
        </button>
        <button class="nav-tab" data-screen="employees" role="tab" aria-selected="false">
          <span class="nav-tab-tag">02</span><span class="nav-tab-label">Сотрудники</span>
        </button>
      </div>
    </div>
  </header>

  <!-- ================= ЭКРАН 01: РЕЙТИНГ ================= -->
  <section id="screen-rating" class="screen active">

    <div class="toolbar">
      <div class="period-tabs" id="periodTabs" role="tablist" aria-label="Период"></div>
      <div class="period-nav">
        <button class="btn-icon" id="periodPrev" aria-label="Предыдущий период">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span class="period-label" id="periodLabel"></span>
        <button class="btn-icon" id="periodNext" aria-label="Следующий период">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <button class="btn-ghost-sm" id="periodToday">Сегодня</button>
      </div>
      <button class="btn-lime" id="btnOpenAward">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Начислить баллы
      </button>
    </div>

    <!-- ПОДИУМ И СПИСОК -->
    <div class="podium-card">
      <div class="podium-header-title">Пьедестал позора · топ-3</div>
      <div class="podium-grid" id="podiumGrid"></div>
      <div class="rest-list" id="restList"></div>
      <div class="empty-inline" id="ratingEmpty" hidden>Нет сотрудников. Добавьте команду на вкладке «Сотрудники».</div>
    </div>

    <!-- ЛЕНТА НАЧИСЛЕНИЙ -->
    <div class="recent-feed">
      <div class="feed-eyebrow">Последние начисления</div>
      <div class="feed-list" id="feedList"></div>
      <div class="empty-inline" id="feedEmpty" hidden>Начислений пока нет.</div>
    </div>
  </section>

  <!-- ================= ЭКРАН 02: СОТРУДНИКИ ================= -->
  <section id="screen-employees" class="screen">
    <div class="toolbar">
      <div>
        <div class="eyebrow">Управление командой</div>
        <div class="page-title" style="font-size:22px;">Сотрудники</div>
      </div>
      <button class="btn-lime" id="btnAddEmployee">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Добавить сотрудника
      </button>
    </div>
    <div class="employees-card">
      <div class="employees-list" id="employeesList"></div>
      <div class="empty-inline" id="employeesEmpty" hidden>Список пуст. Добавьте первого сотрудника.</div>
    </div>
  </section>
</div>

<!-- ============ МОДАЛКА: НАЧИСЛИТЬ БАЛЛЫ ============ -->
<div class="overlay" id="overlayAward" hidden>
  <div class="fmodal" data-stop="1">
    <div class="fmodal-header">
      <div class="fmodal-title">Начислить баллы</div>
      <button class="fmodal-close" id="closeAward" aria-label="Закрыть">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <form class="fmodal-body" id="formAward">
      <!-- Кому -->
      <div class="ffield">
        <div class="ffield-label">
          <span>Кому начислить</span>
          <span class="facc-text" id="selectedCountLabel">выбрано: 0</span>
        </div>
        <div class="chip-row" id="memberChips"></div>
      </div>

      <!-- Тип события -->
      <div class="ffield">
        <div class="ffield-label"><span>Тип события</span></div>
        <div class="type-row" id="typeOptions"></div>
      </div>

      <!-- Количество -->
      <div class="ffield">
        <div class="ffield-label">
          <span>Баллов</span>
          <span class="famount" id="amountDisplay">+1</span>
        </div>
        <div class="quick-row" id="quickBtns" style="margin-bottom: 9px;"></div>
        <input type="number" id="amountInput" class="finput fmono" min="1" step="1" value="1">
      </div>

      <!-- Причина -->
      <div class="ffield">
        <div class="ffield-label"><span>Причина · можно выбрать несколько</span></div>
        <div class="chip-row" id="presetChips" style="margin-bottom: 10px;"></div>
        <input type="text" id="reasonInput" class="finput" placeholder="Комментарий…" maxlength="120">
      </div>

      <!-- Фото-доказательство -->
      <div class="ffield">
        <div class="ffield-label"><span>Фото-доказательство</span></div>
        <label class="upload-label">
          <div id="photoPreviewBox">
            <span style="width:38px; height:38px; border-radius:8px; background:var(--finp); display:flex; align-items:center; justify-content:center; color:var(--fmut);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3.2"/></svg>
            </span>
          </div>
          <span style="font-size: 13px; color: var(--fmut);" id="photoLabelText">Прикрепить фото</span>
          <input type="file" id="photoInput" accept="image/*" style="display: none;">
        </label>
      </div>

      <!-- Дата -->
      <div class="ffield">
        <div class="ffield-label"><span>Дата</span></div>
        <input type="date" id="dateInput" class="finput">
      </div>

      <div class="fmodal-actions">
        <button type="button" class="fbtn-cancel" id="cancelAward">Отмена</button>
        <button type="submit" class="fbtn-submit" id="submitAward">Начислить</button>
      </div>
    </form>
  </div>
</div>

<!-- ============ МОДАЛКА: СОТРУДНИК ============ -->
<div class="overlay" id="overlayEmployee" hidden>
  <div class="fmodal fmodal-sm" data-stop="1">
    <div class="fmodal-header">
      <div class="fmodal-title" id="employeeModalTitle">Новый сотрудник</div>
      <button class="fmodal-close" id="closeEmployee" aria-label="Закрыть">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <form class="fmodal-body" id="formEmployee">
      <input type="hidden" id="employeeId">
      <div class="ffield">
        <div class="ffield-label"><span>ФИО</span></div>
        <input type="text" id="employeeName" class="finput" required maxlength="80" autocomplete="off">
      </div>
      <div class="ffield">
        <div class="ffield-label"><span>Должность</span></div>
        <input type="text" id="employeeRole" class="finput" maxlength="80" autocomplete="off">
      </div>
      <div class="fmodal-actions">
        <button type="button" class="fbtn-cancel" id="cancelEmployee">Отмена</button>
        <button type="submit" class="fbtn-submit">Сохранить</button>
      </div>
    </form>
  </div>
</div>

<!-- ============ МОДАЛКА: ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ ============ -->
<div class="overlay" id="overlayConfirm" hidden>
  <div class="fmodal fmodal-sm" data-stop="1">
    <div class="fmodal-header">
      <div class="fmodal-title">Удалить сотрудника?</div>
      <button class="fmodal-close" id="closeConfirm" aria-label="Закрыть">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="fmodal-body">
      <p style="font-size:14px; color:var(--fmut);" id="confirmText"></p>
      <div class="fmodal-actions">
        <button type="button" class="fbtn-cancel" id="cancelConfirm">Отмена</button>
        <button type="button" class="fbtn-danger" id="confirmDeleteBtn">Удалить</button>
      </div>
    </div>
  </div>
</div>

<!-- TOAST -->
<div class="toast" id="toast" hidden>
  <span id="toastText"></span>
  <button class="toast-undo" id="toastUndo" hidden>Отменить</button>
</div>

<script src="js/app.js"></script>
</body>
</html>
```

---

### Task 3: JavaScript Implementation (`js/app.js`)

**Files:**
- Modify: `js/app.js`

**Interfaces:**
- Consumes: DOM elements from `index.html`.
- Produces: V3 podium rendering logic, quick late actions, photo uploads, event creation, period filtering, toast with undo, and employee management.

- [ ] **Step 1: Rewrite `js/app.js` for V3 design rendering & state handling**

```javascript
(function () {
  'use strict';

  const STORAGE_KEY = 'team_rating_v3_data';

  // Seed default data
  const DEFAULT_MEMBERS = [
    { id: 'm1', name: 'Артём Кузнецов', role: 'Backend' },
    { id: 'm2', name: 'Мария Соколова', role: 'Дизайнер' },
    { id: 'm3', name: 'Дмитрий Волков', role: 'QA' },
    { id: 'm4', name: 'Елена Морозова', role: 'PM' },
    { id: 'm5', name: 'Иван Лебедев', role: 'Frontend' },
    { id: 'm6', name: 'Ольга Новикова', role: 'Аналитик' },
    { id: 'm7', name: 'Павел Орлов', role: 'DevOps' },
    { id: 'm8', name: 'Анна Зайцева', role: 'Frontend' }
  ];

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function todayISO() {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  function getInitials(name) {
    return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  }

  function formatDateStr(isoStr) {
    const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const parts = isoStr.split('-');
    if (parts.length < 3) return isoStr;
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    return `${d} ${months[m] || ''}`;
  }

  function seedEvents() {
    const R = ['Опоздание на дейли', 'Опоздание на встречу', 'Сорван дедлайн', 'Не пришёл без предупреждения', 'Помог команде', 'Закрыл инцидент'];
    const raw = [
      ['m1', 'late', 1, 1], ['m1', 'late', 1, 3], ['m1', 'penalty', 5, 2], ['m1', 'late', 1, 8],
      ['m3', 'late', 1, 1], ['m3', 'late', 1, 2], ['m3', 'penalty', 3, 6], ['m3', 'late', 1, 12],
      ['m5', 'late', 1, 4], ['m5', 'late', 1, 5], ['m5', 'penalty', 4, 9],
      ['m7', 'late', 1, 2], ['m7', 'late', 1, 6], ['m7', 'reward', -2, 3],
      ['m2', 'late', 1, 7], ['m2', 'reward', -3, 2],
      ['m4', 'penalty', 3, 10], ['m4', 'late', 1, 14],
      ['m6', 'late', 1, 11], ['m6', 'reward', -2, 5],
      ['m8', 'late', 1, 20]
    ];
    return raw.map(r => ({
      id: uid(),
      memberId: r[0],
      type: r[1],
      points: r[2],
      date: daysAgo(r[3]),
      reason: r[1] === 'reward' ? R[4 + (r[3] % 2)] : (r[1] === 'penalty' ? R[2 + (r[3] % 2)] : R[r[3] % 2]),
      photo: null
    }));
  }

  // Application State
  let state = {
    theme: 'dark',
    period: 'all',
    currentScreen: 'rating',
    members: [],
    events: [],
    lastAddedEventIds: null,
    awardForm: {
      memberIds: [],
      type: 'late',
      amount: 1,
      reasons: [],
      reasonText: '',
      photo: null,
      date: todayISO()
    },
    editingEmployeeId: null,
    deletingEmployeeId: null
  };

  function loadState() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (data && Array.isArray(data.members) && data.members.length > 0) {
        state.members = data.members;
        state.events = data.events || [];
        return;
      }
    } catch (e) {}
    state.members = DEFAULT_MEMBERS;
    state.events = seedEvents();
    saveState();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        members: state.members,
        events: state.events
      }));
    } catch (e) {}
  }

  // DOM Elements
  const el = {
    themeToggle: document.getElementById('themeToggle'),
    periodTabs: document.getElementById('periodTabs'),
    periodLabel: document.getElementById('periodLabel'),
    periodPrev: document.getElementById('periodPrev'),
    periodNext: document.getElementById('periodNext'),
    periodToday: document.getElementById('periodToday'),
    podiumGrid: document.getElementById('podiumGrid'),
    restList: document.getElementById('restList'),
    ratingEmpty: document.getElementById('ratingEmpty'),
    feedList: document.getElementById('feedList'),
    feedEmpty: document.getElementById('feedEmpty'),
    employeesList: document.getElementById('employeesList'),
    employeesEmpty: document.getElementById('employeesEmpty'),
    btnOpenAward: document.getElementById('btnOpenAward'),
    overlayAward: document.getElementById('overlayAward'),
    closeAward: document.getElementById('closeAward'),
    cancelAward: document.getElementById('cancelAward'),
    formAward: document.getElementById('formAward'),
    memberChips: document.getElementById('memberChips'),
    selectedCountLabel: document.getElementById('selectedCountLabel'),
    typeOptions: document.getElementById('typeOptions'),
    quickBtns: document.getElementById('quickBtns'),
    amountDisplay: document.getElementById('amountDisplay'),
    amountInput: document.getElementById('amountInput'),
    presetChips: document.getElementById('presetChips'),
    reasonInput: document.getElementById('reasonInput'),
    photoInput: document.getElementById('photoInput'),
    photoPreviewBox: document.getElementById('photoPreviewBox'),
    photoLabelText: document.getElementById('photoLabelText'),
    dateInput: document.getElementById('dateInput'),
    submitAward: document.getElementById('submitAward'),
    btnAddEmployee: document.getElementById('btnAddEmployee'),
    overlayEmployee: document.getElementById('overlayEmployee'),
    closeEmployee: document.getElementById('closeEmployee'),
    cancelEmployee: document.getElementById('cancelEmployee'),
    formEmployee: document.getElementById('formEmployee'),
    employeeModalTitle: document.getElementById('employeeModalTitle'),
    employeeId: document.getElementById('employeeId'),
    employeeName: document.getElementById('employeeName'),
    employeeRole: document.getElementById('employeeRole'),
    overlayConfirm: document.getElementById('overlayConfirm'),
    closeConfirm: document.getElementById('closeConfirm'),
    cancelConfirm: document.getElementById('cancelConfirm'),
    confirmText: document.getElementById('confirmText'),
    confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
    toast: document.getElementById('toast'),
    toastText: document.getElementById('toastText'),
    toastUndo: document.getElementById('toastUndo')
  };

  let toastTimer = null;

  function showToast(text, canUndo = false) {
    clearTimeout(toastTimer);
    el.toastText.textContent = text;
    el.toastUndo.hidden = !canUndo;
    el.toast.hidden = false;
    toastTimer = setTimeout(() => {
      el.toast.hidden = true;
    }, 4500);
  }

  function handleUndo() {
    if (!state.lastAddedEventIds) return;
    const idsSet = new Set(state.lastAddedEventIds);
    state.events = state.events.filter(e => !idsSet.has(e.id));
    state.lastAddedEventIds = null;
    saveState();
    render();
    el.toast.hidden = true;
    showToast('Начисление отменено');
  }

  // Period filtering helper
  function inPeriod(dateStr) {
    if (state.period === 'all') return true;
    const days = state.period === 'week' ? 7 : 31;
    const t = new Date(dateStr + 'T12:00:00').getTime();
    return t >= Date.now() - days * 86400000;
  }

  function getRankedData() {
    const totals = new Map();
    state.members.forEach(m => totals.set(m.id, { points: 0, late: 0 }));

    state.events.forEach(ev => {
      if (!inPeriod(ev.date)) return;
      const b = totals.get(ev.memberId);
      if (!b) return;
      b.points += ev.points;
      if (ev.type === 'late') b.late += 1;
    });

    let rows = state.members.map(m => {
      const t = totals.get(m.id) || { points: 0, late: 0 };
      return {
        id: m.id,
        name: m.name,
        role: m.role,
        initials: getInitials(m.name),
        points: t.points,
        late: t.late
      };
    });

    rows.sort((a, b) => b.points - a.points || b.late - a.late || a.name.localeCompare(b.name, 'ru'));
    rows.forEach((r, i) => r.rank = i + 1);
    return rows;
  }

  // RENDERERS
  function renderTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    el.themeToggle.textContent = state.theme === 'dark' ? '☀' : '☾';
    el.themeToggle.title = state.theme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
  }

  function renderPeriodNav() {
    const periodDefs = [
      ['week', 'Неделя'],
      ['month', 'Месяц'],
      ['all', 'Всё время']
    ];
    el.periodTabs.innerHTML = periodDefs.map(([key, label]) => `
      <button class="period-tab ${state.period === key ? 'active' : ''}" data-period="${key}">${label}</button>
    `).join('');

    const labels = { week: 'Неделя', month: 'Месяц', all: 'Всё время' };
    el.periodLabel.textContent = labels[state.period] || '';
  }

  function renderPodium(rankedRows) {
    if (!rankedRows.length) {
      el.podiumGrid.innerHTML = '';
      el.restList.innerHTML = '';
      el.ratingEmpty.hidden = false;
      return;
    }
    el.ratingEmpty.hidden = true;

    const top3 = rankedRows.slice(0, 3);
    const rest = rankedRows.slice(3);

    // Podium configuration for V3 layout
    // Order of podium display: [2nd place, 1st place, 3rd place]
    const podiumOrder = [];
    if (top3[1]) podiumOrder.push({ data: top3[1], pos: 2 });
    if (top3[0]) podiumOrder.push({ data: top3[0], pos: 1 });
    if (top3[2]) podiumOrder.push({ data: top3[2], pos: 3 });

    const styles = {
      1: { color: '#e5b567', height: '150px', avSize: '78px' },
      2: { color: '#c0c0cc', height: '116px', avSize: '66px' },
      3: { color: '#cd7f4d', height: '92px', avSize: '60px' }
    };

    el.podiumGrid.innerHTML = podiumOrder.map(item => {
      const r = item.data;
      const rank = r.rank;
      const st = styles[rank];
      const isFirst = rank === 1;

      return `
        <div class="podium-col">
          <div class="avatar-wrap">
            ${isFirst ? `<img src="assets/medal-antihero.png" class="medal-img" alt="Медаль антигероя" title="Антигерой месяца">` : ''}
            <div class="avatar-circle" style="width:${st.avSize}; height:${st.avSize}; border: 2px dashed ${st.color}; color:${st.color};">
              ${r.initials}
            </div>
            <div class="rank-badge" style="background:${st.color};">${rank}</div>
          </div>
          <div class="podium-info">
            <div class="podium-name">${r.name}</div>
            <div class="podium-role">${r.role || '—'}</div>
          </div>
          <div class="podium-stand" style="height:${st.height}; background: linear-gradient(180deg, ${st.color} 0%, rgba(255,255,255,0) 260%); border-color:${st.color};">
            <div class="podium-points">${r.points > 0 ? '+' : ''}${r.points}</div>
            <div class="podium-unit">штрафных</div>
          </div>
        </div>
      `;
    }).join('');

    // Rest list rendering
    el.restList.innerHTML = rest.map(r => `
      <div class="rest-item">
        <div class="rest-rank">${r.rank}</div>
        <div class="rest-user">
          <div class="rest-avatar">${r.initials}</div>
          <div style="min-width:0;">
            <div class="rest-name">${r.name}</div>
            <div class="rest-role">${r.role || '—'}</div>
          </div>
        </div>
        <div class="rest-late">${r.late} оп.</div>
        <div class="rest-points">${r.points > 0 ? '+' : ''}${r.points}</div>
        <button class="btn-quick-late" data-id="${r.id}" title="Опоздание +1">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>
        </button>
      </div>
    `).join('');
  }

  function renderFeed() {
    const memberMap = new Map(state.members.map(m => [m.id, m.name]));
    const typeMeta = {
      late: { label: 'Опоздание', icon: '⏱', tint: 'rgba(193,18,31,.16)', color: '#ff8a8a' },
      penalty: { label: 'Штраф', icon: '⚠', tint: 'rgba(245,158,11,.16)', color: '#f5b23c' },
      reward: { label: 'Награда', icon: '★', tint: 'rgba(34,197,94,.16)', color: '#6ee7a0' }
    };

    const recent = [...state.events].reverse().slice(0, 6);
    if (!recent.length) {
      el.feedList.innerHTML = '';
      el.feedEmpty.hidden = false;
      return;
    }
    el.feedEmpty.hidden = true;

    el.feedList.innerHTML = recent.map(ev => {
      const tm = typeMeta[ev.type] || typeMeta.late;
      const mName = memberMap.get(ev.memberId) || '—';
      const ptsStr = (ev.points > 0 ? '+' : '') + ev.points;
      const ptsColor = ev.points > 0 ? '#ff8a8a' : '#6ee7a0';

      return `
        <div class="feed-item">
          ${ev.photo ? `<img src="${ev.photo}" class="feed-photo" alt="Доказательство">` : ''}
          <div class="feed-icon-box" style="background:${tm.tint}; color:${tm.color};">${tm.icon}</div>
          <div class="feed-info">
            <div class="feed-title"><strong>${mName}</strong> — ${ev.reason}</div>
            <div class="feed-sub">${tm.label} · ${formatDateStr(ev.date)}</div>
          </div>
          <div class="feed-pts" style="color:${ptsColor};">${ptsStr}</div>
        </div>
      `;
    }).join('');
  }

  function renderEmployees() {
    if (!state.members.length) {
      el.employeesList.innerHTML = '';
      el.employeesEmpty.hidden = false;
      return;
    }
    el.employeesEmpty.hidden = true;

    el.employeesList.innerHTML = state.members.map(m => `
      <div class="emp-item">
        <div class="emp-info-group">
          <div class="emp-avatar">${getInitials(m.name)}</div>
          <div>
            <div style="font-weight:600; font-size:15px; color:var(--ffg);">${m.name}</div>
            <div style="font-size:12.5px; color:var(--fmut);">${m.role || 'Должность не указана'}</div>
          </div>
        </div>
        <div class="emp-actions">
          <button class="btn-sm-action btn-edit-emp" data-id="${m.id}">Изменить</button>
          <button class="btn-sm-danger btn-del-emp" data-id="${m.id}">Удалить</button>
        </div>
      </div>
    `).join('');
  }

  function renderAwardModal() {
    const f = state.awardForm;

    // Member Chips
    el.memberChips.innerHTML = state.members.map(m => {
      const selected = f.memberIds.includes(m.id);
      return `<button type="button" class="chip-btn ${selected ? 'selected' : ''}" data-mid="${m.id}">${m.name}</button>`;
    }).join('');
    el.selectedCountLabel.textContent = `выбрано: ${f.memberIds.length}`;

    // Event Types
    const types = [
      ['late', 'Опоздание'],
      ['penalty', 'Штраф'],
      ['reward', 'Награда (−)']
    ];
    el.typeOptions.innerHTML = types.map(([key, label]) => `
      <button type="button" class="type-btn ${f.type === key ? 'selected' : ''}" data-type="${key}">${label}</button>
    `).join('');

    // Quick Amounts
    const quicks = [1, 5, 10];
    el.quickBtns.innerHTML = quicks.map(val => `
      <button type="button" class="quick-btn ${Number(f.amount) === val ? 'selected' : ''}" data-qval="${val}">+${val}</button>
    `).join('');

    const sign = f.type === 'reward' ? '−' : '+';
    el.amountDisplay.textContent = sign + Math.max(1, Math.round(Math.abs(f.amount || 1)));
    el.amountInput.value = f.amount;

    // Preset chips
    const presets = ['Опоздание на дейли', 'Опоздание на встречу', 'Сорван дедлайн', 'Без предупреждения', 'Помог команде', 'Закрыл инцидент'];
    el.presetChips.innerHTML = presets.map(txt => {
      const sel = f.reasons.includes(txt);
      return `<button type="button" class="chip-btn ${sel ? 'selected' : ''}" data-preset="${txt}">${sel ? '✓ ' : ''}${txt}</button>`;
    }).join('');

    el.reasonInput.value = f.reasonText;
    el.dateInput.value = f.date;

    // Photo preview
    if (f.photo) {
      el.photoPreviewBox.innerHTML = `<img src="${f.photo}" style="width:38px; height:38px; border-radius:8px; object-fit:cover;">`;
      el.photoLabelText.textContent = 'Фото прикреплено — заменить';
    } else {
      el.photoPreviewBox.innerHTML = `<span style="width:38px; height:38px; border-radius:8px; background:var(--finp); display:flex; align-items:center; justify-content:center; color:var(--fmut);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3.2"/></svg></span>`;
      el.photoLabelText.textContent = 'Прикрепить фото';
    }

    const n = f.memberIds.length;
    el.submitAward.textContent = n > 1 ? `Начислить ${n}` : 'Начислить';
  }

  function render() {
    renderTheme();
    renderPeriodNav();

    const ranked = getRankedData();
    renderPodium(ranked);
    renderFeed();
    renderEmployees();

    // Toggle screen visibility
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => {
      const active = t.dataset.screen === state.currentScreen;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    const activeScreen = document.getElementById(`screen-${state.currentScreen}`);
    if (activeScreen) activeScreen.classList.add('active');
  }

  // EVENT LISTENERS
  function setupEventListeners() {
    // Theme toggle
    el.themeToggle.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      renderTheme();
    });

    // Screen switching
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        state.currentScreen = tab.dataset.screen;
        render();
      });
    });

    // Period switching
    el.periodTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.period-tab');
      if (btn) {
        state.period = btn.dataset.period;
        render();
      }
    });

    el.periodToday.addEventListener('click', () => {
      state.period = 'all';
      render();
    });

    // Quick Late button in rest list
    el.restList.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-quick-late');
      if (btn) {
        const id = btn.dataset.id;
        const newEv = {
          id: uid(),
          memberId: id,
          type: 'late',
          points: 1,
          date: todayISO(),
          reason: 'Опоздание',
          photo: null
        };
        state.events.push(newEv);
        state.lastAddedEventIds = [newEv.id];
        saveState();
        render();
        showToast('Опоздание отмечено (+1)', true);
      }
    });

    // Open Award Form
    el.btnOpenAward.addEventListener('click', () => {
      state.awardForm = {
        memberIds: state.members.length > 0 ? [state.members[0].id] : [],
        type: 'late',
        amount: 1,
        reasons: [],
        reasonText: '',
        photo: null,
        date: todayISO()
      };
      renderAwardModal();
      el.overlayAward.hidden = false;
    });

    el.closeAward.addEventListener('click', () => el.overlayAward.hidden = true);
    el.cancelAward.addEventListener('click', () => el.overlayAward.hidden = true);
    el.overlayAward.addEventListener('click', (e) => {
      if (e.target === el.overlayAward) el.overlayAward.hidden = true;
    });

    // Member selection in form
    el.memberChips.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip-btn');
      if (btn) {
        const mid = btn.dataset.mid;
        const cur = state.awardForm.memberIds;
        state.awardForm.memberIds = cur.includes(mid) ? cur.filter(id => id !== mid) : [...cur, mid];
        renderAwardModal();
      }
    });

    // Type selection
    el.typeOptions.addEventListener('click', (e) => {
      const btn = e.target.closest('.type-btn');
      if (btn) {
        state.awardForm.type = btn.dataset.type;
        renderAwardModal();
      }
    });

    // Quick Amount selection
    el.quickBtns.addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-btn');
      if (btn) {
        state.awardForm.amount = Number(btn.dataset.qval);
        renderAwardModal();
      }
    });

    el.amountInput.addEventListener('input', (e) => {
      state.awardForm.amount = Math.max(1, Number(e.target.value) || 1);
      const sign = state.awardForm.type === 'reward' ? '−' : '+';
      el.amountDisplay.textContent = sign + state.awardForm.amount;
    });

    // Preset Chips
    el.presetChips.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip-btn');
      if (btn) {
        const preset = btn.dataset.preset;
        const cur = state.awardForm.reasons;
        state.awardForm.reasons = cur.includes(preset) ? cur.filter(r => r !== preset) : [...cur, preset];
        renderAwardModal();
      }
    });

    el.reasonInput.addEventListener('input', (e) => {
      state.awardForm.reasonText = e.target.value;
    });

    el.dateInput.addEventListener('change', (e) => {
      state.awardForm.date = e.target.value;
    });

    // Photo input
    el.photoInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          state.awardForm.photo = reader.result;
          renderAwardModal();
        };
        reader.readAsDataURL(file);
      }
    });

    // Submit Award Form
    el.formAward.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = state.awardForm;
      if (!f.memberIds.length) {
        showToast('Выберите хотя бы одного сотрудника');
        return;
      }

      const combinedReason = [...f.reasons, f.reasonText.trim()].filter(Boolean).join(' · ') ||
        (f.type === 'reward' ? 'Награда' : (f.type === 'penalty' ? 'Штраф' : 'Опоздание'));

      const sign = f.type === 'reward' ? -1 : 1;
      const pts = sign * Math.max(1, Math.round(Math.abs(f.amount)));

      const createdIds = [];
      f.memberIds.forEach(mid => {
        const ev = {
          id: uid(),
          memberId: mid,
          type: f.type,
          points: pts,
          date: f.date || todayISO(),
          reason: combinedReason,
          photo: f.photo || null
        };
        state.events.push(ev);
        createdIds.push(ev.id);
      });

      state.lastAddedEventIds = createdIds;
      saveState();
      el.overlayAward.hidden = true;
      render();

      const count = f.memberIds.length;
      showToast(count > 1 ? `Начислено ${count} сотрудникам` : 'Баллы начислены', true);
    });

    // Employee CRUD
    el.btnAddEmployee.addEventListener('click', () => {
      state.editingEmployeeId = null;
      el.employeeModalTitle.textContent = 'Новый сотрудник';
      el.employeeId.value = '';
      el.employeeName.value = '';
      el.employeeRole.value = '';
      el.overlayEmployee.hidden = false;
    });

    el.closeEmployee.addEventListener('click', () => el.overlayEmployee.hidden = true);
    el.cancelEmployee.addEventListener('click', () => el.overlayEmployee.hidden = true);

    el.employeesList.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.btn-edit-emp');
      const delBtn = e.target.closest('.btn-del-emp');

      if (editBtn) {
        const id = editBtn.dataset.id;
        const m = state.members.find(x => x.id === id);
        if (m) {
          state.editingEmployeeId = id;
          el.employeeModalTitle.textContent = 'Редактировать сотрудника';
          el.employeeId.value = m.id;
          el.employeeName.value = m.name;
          el.employeeRole.value = m.role || '';
          el.overlayEmployee.hidden = false;
        }
      }

      if (delBtn) {
        const id = delBtn.dataset.id;
        const m = state.members.find(x => x.id === id);
        if (m) {
          state.deletingEmployeeId = id;
          el.confirmText.textContent = `Вы действительно хотите удалить сотрудника «${m.name}»? Все его начисления сохранятся в истории.`;
          el.overlayConfirm.hidden = false;
        }
      }
    });

    el.formEmployee.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = el.employeeName.value.trim();
      const role = el.employeeRole.value.trim();
      if (!name) return;

      if (state.editingEmployeeId) {
        const m = state.members.find(x => x.id === state.editingEmployeeId);
        if (m) {
          m.name = name;
          m.role = role;
        }
      } else {
        state.members.push({
          id: uid(),
          name: name,
          role: role
        });
      }

      saveState();
      el.overlayEmployee.hidden = true;
      render();
      showToast(state.editingEmployeeId ? 'Сотрудник обновлен' : 'Сотрудник добавлен');
    });

    el.closeConfirm.addEventListener('click', () => el.overlayConfirm.hidden = true);
    el.cancelConfirm.addEventListener('click', () => el.overlayConfirm.hidden = true);
    el.confirmDeleteBtn.addEventListener('click', () => {
      if (state.deletingEmployeeId) {
        state.members = state.members.filter(m => m.id !== state.deletingEmployeeId);
        state.deletingEmployeeId = null;
        saveState();
        el.overlayConfirm.hidden = true;
        render();
        showToast('Сотрудник удален');
      }
    });

    el.toastUndo.addEventListener('click', handleUndo);
  }

  // INITIALIZATION
  loadState();
  setupEventListeners();
  render();
})();
```

- [ ] **Step 2: Run syntax & logic verification on `js/app.js`**

Verify that all methods, event listeners, variables, and DOM ID bindings match `index.html`.

---

### Task 4: Visual Verification & Final Testing

**Files:**
- Test: `index.html`, `css/style.css`, `js/app.js`

- [ ] **Step 1: Check file assets**
Ensure `assets/medal-antihero.png` exists and is accessible.

- [ ] **Step 2: Launch local dev server & verify browser rendering**
Run local HTTP server or verify in browser to ensure:
1. Top 3 Podium displays rank 1 in center with anti-hero medal, rank 2 silver on left, rank 3 bronze on right.
2. Rest list displays 4+ places with quick "+1" late action button.
3. Toolbar theme toggle (Dark/Light) dynamically switches styles.
4. Award modal permits multi-selecting members, adding reasons, uploaded photo preview, date picking, and submit.
5. Feed updates immediately after awarding points.
6. Employee management tab permits adding, editing, and deleting team members.

- [ ] **Step 3: Verification commit**
Commit all changes to git repository.
