interface Particle {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  life: number;
}

let burstLayer: HTMLDivElement | null = null;
let activeParticles: Particle[] = [];
let burstRafId = 0;
let lastTs = 0;

function ensureBurstLayer(): HTMLDivElement {
  if (!burstLayer || !document.body.contains(burstLayer)) {
    burstLayer = document.createElement('div');
    burstLayer.id = 'emojiBurstLayer';
    burstLayer.style.cssText = 'position:fixed; inset:0; z-index:99999; pointer-events:none; overflow:hidden;';
    document.body.appendChild(burstLayer);
  }
  return burstLayer;
}

function stepBurst(ts: number) {
  const dt = lastTs ? Math.min(3, (ts - lastTs) / 16.6667) : 1;
  lastTs = ts;

  const gravityVal = 0.35;
  const viewportH = window.innerHeight;
  const viewportW = window.innerWidth;

  for (let i = activeParticles.length - 1; i >= 0; i--) {
    const p = activeParticles[i];
    p.vy += gravityVal * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rot += p.vrot * dt;
    p.life -= dt;

    if (p.life <= 0 || p.y > viewportH + 50 || p.x < -100 || p.x > viewportW + 100) {
      if (p.el.parentNode) {
        p.el.parentNode.removeChild(p.el);
      }
      activeParticles.splice(i, 1);
      continue;
    }

    const fade = p.life < 22 ? Math.max(0, p.life / 22) : 1;
    p.el.style.opacity = String(fade);
    p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg)`;
  }

  if (activeParticles.length > 0) {
    burstRafId = requestAnimationFrame(stepBurst);
  } else {
    burstRafId = 0;
    lastTs = 0;
  }
}

export function triggerEmojiBurst(buttonEl?: HTMLElement | null) {
  const layer = ensureBurstLayer();
  const emojis = ['😤', '😡', '👿', '🤬', '😠', '💢'];
  const burstCount = 26;
  const power = 13.5;
  const spread = 55;
  const emojiSize = 34;
  const shakeIntensity = 5;

  // Quick shake animation of the button
  if (buttonEl && typeof buttonEl.animate === 'function') {
    buttonEl.animate(
      [
        { transform: 'translate(0px, 0px) rotate(0deg)' },
        { transform: `translate(${shakeIntensity}px, ${-shakeIntensity * 0.6}px) rotate(-3.5deg)` },
        { transform: `translate(${-shakeIntensity}px, ${shakeIntensity * 0.3}px) rotate(3.5deg)` },
        { transform: `translate(${shakeIntensity * 0.5}px, 0px) rotate(-1deg)` },
        { transform: 'translate(0px, 0px) rotate(0deg)' }
      ],
      { duration: 260, easing: 'cubic-bezier(.36,.07,.19,.97)' }
    );
  }

  // Vibration API if supported
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(30);
    } catch (e) {
      // Ignore
    }
  }

  let ox = window.innerWidth / 2;
  let oy = window.innerHeight / 2;
  if (buttonEl) {
    const rect = buttonEl.getBoundingClientRect();
    ox = rect.left + rect.width / 2;
    oy = rect.top + rect.height / 2;
  }

  const MAX_PARTICLES = 140;
  for (let k = 0; k < burstCount; k++) {
    if (activeParticles.length >= MAX_PARTICLES) break;
    const elNode = document.createElement('span');
    elNode.textContent = emojis[(Math.random() * emojis.length) | 0];
    elNode.style.cssText = `position:fixed; left:0; top:0; font-size:${emojiSize}px; line-height:1; pointer-events:none; user-select:none; will-change:transform,opacity; z-index:99999;`;
    elNode.setAttribute('aria-hidden', 'true');
    layer.appendChild(elNode);

    const ang = ((-90 + (Math.random() * 2 - 1) * spread) * Math.PI) / 180;
    const speed = power * (0.65 + Math.random() * 0.8);

    activeParticles.push({
      el: elNode,
      x: ox - emojiSize / 2,
      y: oy - emojiSize / 2,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      rot: Math.random() * 360,
      vrot: (Math.random() * 2 - 1) * 14,
      life: 200 + Math.random() * 60
    });
  }

  if (!burstRafId) {
    lastTs = 0;
    burstRafId = requestAnimationFrame(stepBurst);
  }
}
