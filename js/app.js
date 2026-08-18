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

  // EMOJI BURST EFFECT ENGINE
  let burstLayer = null;
  let activeParticles = [];
  let burstRafId = 0;
  let lastTs = 0;

  function ensureBurstLayer() {
    if (!burstLayer) {
      burstLayer = document.createElement('div');
      burstLayer.id = 'emojiBurstLayer';
      burstLayer.style.cssText = 'position:fixed; inset:0; z-index:99999; pointer-events:none; overflow:hidden;';
      document.body.appendChild(burstLayer);
    }
    return burstLayer;
  }

  function stepBurst(ts) {
    let dt = lastTs ? (ts - lastTs) / 16.6667 : 1;
    lastTs = ts;
    if (dt > 3) dt = 3;

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
        if (p.el.parentNode) p.el.parentNode.removeChild(p.el);
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

  function triggerEmojiBurst(buttonEl) {
    const layer = ensureBurstLayer();
    const emojis = ["😤", "😡", "👿", "🤬", "😠", "💢"];
    const burstCount = 26;
    const power = 13.5;
    const spread = 55;
    const emojiSize = 34;
    const shakeIntensity = 5;

    // Quick shake animation of the button
    if (buttonEl && typeof buttonEl.animate === 'function') {
      buttonEl.animate([
        { transform: 'translate(0px, 0px) rotate(0deg)' },
        { transform: `translate(${shakeIntensity}px, ${-shakeIntensity * 0.6}px) rotate(-3.5deg)` },
        { transform: `translate(${-shakeIntensity}px, ${shakeIntensity * 0.3}px) rotate(3.5deg)` },
        { transform: `translate(${shakeIntensity * 0.5}px, 0px) rotate(-1deg)` },
        { transform: 'translate(0px, 0px) rotate(0deg)' }
      ], { duration: 260, easing: 'cubic-bezier(.36,.07,.19,.97)' });
    }

    // Vibration API if supported
    if (navigator.vibrate) {
      try { navigator.vibrate(30); } catch(e){}
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
        triggerEmojiBurst(btn);
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
      showToast(count > 1 ? `Начислить ${count} сотрудникам` : 'Баллы начислены', true);
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
