'use strict';

/* ===================== Storage ===================== */

const STORAGE_KEY = 'eballs_state_v1';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { employees: [], events: [] };
    const parsed = JSON.parse(raw);
    return {
      employees: Array.isArray(parsed.employees) ? parsed.employees : [],
      events: Array.isArray(parsed.events) ? parsed.events : []
    };
  } catch (e) {
    console.error('Не удалось прочитать данные из localStorage', e);
    return { employees: [], events: [] };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function todayISODate() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

/* ===================== Date / period helpers ===================== */

const MONTH_NAMES = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MONTH_NAMES_NOM = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

function isoWeekInfo(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayNum = (d.getDay() + 6) % 7; // Mon=0..Sun=6
  d.setDate(d.getDate() - dayNum + 3); // nearest Thursday
  const isoYear = d.getFullYear();
  const jan4 = new Date(isoYear, 0, 4);
  const jan4Day = (jan4.getDay() + 6) % 7;
  const week1Monday = new Date(jan4);
  week1Monday.setDate(jan4.getDate() - jan4Day);
  const week = 1 + Math.round((d - week1Monday) / (7 * 86400000));
  return { isoYear, isoWeek: week };
}

function isoWeekStartDate(isoYear, isoWeek) {
  const jan4 = new Date(isoYear, 0, 4);
  const jan4Day = (jan4.getDay() + 6) % 7;
  const week1Monday = new Date(jan4);
  week1Monday.setDate(jan4.getDate() - jan4Day);
  const start = new Date(week1Monday);
  start.setDate(week1Monday.getDate() + (isoWeek - 1) * 7);
  start.setHours(0, 0, 0, 0);
  return start;
}

function getRange(periodType, anchor) {
  if (periodType === 'week') {
    const info = isoWeekInfo(anchor);
    const start = isoWeekStartDate(info.isoYear, info.isoWeek);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return { start, end };
  }
  if (periodType === 'sprint') {
    const info = isoWeekInfo(anchor);
    const oddWeek = info.isoWeek % 2 === 1 ? info.isoWeek : info.isoWeek - 1;
    const start = isoWeekStartDate(info.isoYear, oddWeek < 1 ? 1 : oddWeek);
    const end = new Date(start);
    end.setDate(start.getDate() + 14);
    return { start, end };
  }
  if (periodType === 'month') {
    const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1);
    return { start, end };
  }
  if (periodType === 'quarter') {
    const q = Math.floor(anchor.getMonth() / 3);
    const start = new Date(anchor.getFullYear(), q * 3, 1);
    const end = new Date(anchor.getFullYear(), q * 3 + 3, 1);
    return { start, end };
  }
  // year
  const start = new Date(anchor.getFullYear(), 0, 1);
  const end = new Date(anchor.getFullYear() + 1, 0, 1);
  return { start, end };
}

function shiftAnchor(periodType, anchor, dir) {
  const d = new Date(anchor);
  if (periodType === 'week') d.setDate(d.getDate() + dir * 7);
  else if (periodType === 'sprint') d.setDate(d.getDate() + dir * 14);
  else if (periodType === 'month') d.setMonth(d.getMonth() + dir);
  else if (periodType === 'quarter') d.setMonth(d.getMonth() + dir * 3);
  else d.setFullYear(d.getFullYear() + dir);
  return d;
}

function formatShortDate(d) {
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}

function formatRangeLabel(periodType, start, end) {
  const lastDay = new Date(end);
  lastDay.setDate(lastDay.getDate() - 1);
  if (periodType === 'week' || periodType === 'sprint') {
    const sameYear = start.getFullYear() === lastDay.getFullYear();
    return `${formatShortDate(start)} – ${formatShortDate(lastDay)}${sameYear ? ' ' + start.getFullYear() : ''}`;
  }
  if (periodType === 'month') {
    return `${MONTH_NAMES_NOM[start.getMonth()]} ${start.getFullYear()}`;
  }
  if (periodType === 'quarter') {
    const q = Math.floor(start.getMonth() / 3) + 1;
    return `${q} квартал ${start.getFullYear()}`;
  }
  return `${start.getFullYear()} год`;
}

/* ===================== UI state ===================== */

let currentPeriodType = 'week';
let periodAnchor = new Date();

/* ===================== Rendering: Rating ===================== */

function computeRatingRows(periodType, anchor) {
  const { start, end } = getRange(periodType, anchor);
  const startMs = start.getTime();
  const endMs = end.getTime();

  const totals = new Map();
  for (const emp of state.employees) {
    totals.set(emp.id, { points: 0, lateCount: 0 });
  }
  for (const ev of state.events) {
    const t = new Date(ev.date + 'T12:00:00').getTime();
    if (t < startMs || t >= endMs) continue;
    const bucket = totals.get(ev.employeeId);
    if (!bucket) continue;
    bucket.points += ev.points;
    if (ev.type === 'late') bucket.lateCount += 1;
  }

  const rows = state.employees.map(emp => {
    const t = totals.get(emp.id) || { points: 0, lateCount: 0 };
    return { employee: emp, points: t.points, lateCount: t.lateCount };
  });

  rows.sort((a, b) => b.points - a.points || a.employee.name.localeCompare(b.employee.name, 'ru'));
  return { rows, start, end };
}

function renderRating() {
  const { rows, start, end } = computeRatingRows(currentPeriodType, periodAnchor);
  document.getElementById('periodLabel').textContent = formatRangeLabel(currentPeriodType, start, end);

  const tbody = document.getElementById('ratingBody');
  const emptyState = document.getElementById('ratingEmpty');
  tbody.innerHTML = '';

  if (rows.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  rows.forEach((row, idx) => {
    const tr = document.createElement('tr');
    const rank = idx + 1;
    const rankClass = row.points > 0 && rank <= 3 ? ` rank-${rank}` : '';

    const pointsClass = row.points > 0 ? 'positive' : (row.points < 0 ? 'negative' : 'zero');

    tr.innerHTML = `
      <td><span class="rank-badge${rankClass}">${rank}</span></td>
      <td>
        <div class="employee-name-cell" data-open-history="${row.employee.id}">
          <span class="name">${escapeHtml(row.employee.name)}</span>
          ${row.employee.position ? `<span class="position">${escapeHtml(row.employee.position)}</span>` : ''}
        </div>
      </td>
      <td class="col-num">${row.lateCount}</td>
      <td class="col-num"><span class="points-value ${pointsClass}">${row.points}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

/* ===================== Rendering: Employees ===================== */

function computeAllTimeTotals() {
  const totals = new Map();
  for (const emp of state.employees) totals.set(emp.id, { points: 0, lateCount: 0 });
  for (const ev of state.events) {
    const bucket = totals.get(ev.employeeId);
    if (!bucket) continue;
    bucket.points += ev.points;
    if (ev.type === 'late') bucket.lateCount += 1;
  }
  return totals;
}

function renderEmployees() {
  const tbody = document.getElementById('employeesBody');
  const emptyState = document.getElementById('employeesEmpty');
  tbody.innerHTML = '';

  if (state.employees.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  const totals = computeAllTimeTotals();
  const sorted = [...state.employees].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  sorted.forEach(emp => {
    const t = totals.get(emp.id) || { points: 0, lateCount: 0 };
    const pointsClass = t.points > 0 ? 'positive' : (t.points < 0 ? 'negative' : 'zero');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="employee-name-cell" data-open-history="${emp.id}">
          <span class="name">${escapeHtml(emp.name)}</span>
        </div>
      </td>
      <td class="col-position">${emp.position ? escapeHtml(emp.position) : '—'}</td>
      <td class="col-num">${t.lateCount}</td>
      <td class="col-num"><span class="points-value ${pointsClass}">${t.points}</span></td>
      <td class="col-actions">
        <div class="row-actions">
          <button class="btn-icon accent" data-action="add-late" data-id="${emp.id}" title="Зафиксировать опоздание (+1 балл)" aria-label="Зафиксировать опоздание">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </button>
          <button class="btn-icon" data-action="edit-points" data-id="${emp.id}" title="Начислить / списать баллы" aria-label="Начислить или списать баллы">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </button>
          <button class="btn-icon" data-action="history" data-id="${emp.id}" title="История" aria-label="История событий">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13a9 9 0 1 0 .5-4.5L3 8"/><path d="M12 7v5l4 2"/></svg>
          </button>
          <button class="btn-icon" data-action="edit-employee" data-id="${emp.id}" title="Редактировать" aria-label="Редактировать сотрудника">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>
          </button>
          <button class="btn-icon danger" data-action="delete-employee" data-id="${emp.id}" title="Удалить" aria-label="Удалить сотрудника">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderAll() {
  renderRating();
  renderEmployees();
  saveState();
}

/* ===================== View / tab switching ===================== */

document.querySelectorAll('.tab-main').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-main').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const view = btn.dataset.view;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`view-${view}`).classList.add('active');
  });
});

document.querySelectorAll('.period-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.period-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentPeriodType = btn.dataset.period;
    periodAnchor = new Date();
    renderRating();
  });
});

document.getElementById('periodPrev').addEventListener('click', () => {
  periodAnchor = shiftAnchor(currentPeriodType, periodAnchor, -1);
  renderRating();
});
document.getElementById('periodNext').addEventListener('click', () => {
  const next = shiftAnchor(currentPeriodType, periodAnchor, 1);
  if (next.getTime() > Date.now()) return; // не уходим в будущее
  periodAnchor = next;
  renderRating();
});
document.getElementById('periodToday').addEventListener('click', () => {
  periodAnchor = new Date();
  renderRating();
});

/* ===================== Modal helpers ===================== */

function openModal(overlayId) {
  document.getElementById(overlayId).hidden = false;
}
function closeModal(overlayId) {
  document.getElementById(overlayId).hidden = true;
}
document.querySelectorAll('[data-close-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal-overlay').hidden = true;
  });
});
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.hidden = true;
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay').forEach(o => { o.hidden = true; });
  }
});

/* ===================== Toast ===================== */

let toastTimer = null;
function showToast(text, undoFn) {
  const toast = document.getElementById('toast');
  const undoBtn = document.getElementById('toastUndo');
  document.getElementById('toastText').textContent = text;
  clearTimeout(toastTimer);

  if (undoFn) {
    undoBtn.hidden = false;
    undoBtn.onclick = () => {
      undoFn();
      toast.hidden = true;
    };
  } else {
    undoBtn.hidden = true;
    undoBtn.onclick = null;
  }

  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 5000);
}

/* ===================== Employee CRUD ===================== */

document.getElementById('btnAddEmployee').addEventListener('click', () => {
  document.getElementById('modalEmployeeTitle').textContent = 'Новый сотрудник';
  document.getElementById('employeeId').value = '';
  document.getElementById('employeeName').value = '';
  document.getElementById('employeePosition').value = '';
  openModal('overlayEmployee');
  document.getElementById('employeeName').focus();
});

document.getElementById('formEmployee').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('employeeId').value;
  const name = document.getElementById('employeeName').value.trim();
  const position = document.getElementById('employeePosition').value.trim();
  if (!name) return;

  if (id) {
    const emp = state.employees.find(x => x.id === id);
    if (emp) { emp.name = name; emp.position = position; }
  } else {
    state.employees.push({ id: uid(), name, position, createdAt: new Date().toISOString() });
  }
  closeModal('overlayEmployee');
  renderAll();
  showToast(id ? 'Сотрудник обновлён' : 'Сотрудник добавлен');
});

function openEditEmployee(id) {
  const emp = state.employees.find(x => x.id === id);
  if (!emp) return;
  document.getElementById('modalEmployeeTitle').textContent = 'Редактировать сотрудника';
  document.getElementById('employeeId').value = emp.id;
  document.getElementById('employeeName').value = emp.name;
  document.getElementById('employeePosition').value = emp.position || '';
  openModal('overlayEmployee');
}

function deleteEmployee(id) {
  const emp = state.employees.find(x => x.id === id);
  if (!emp) return;
  document.getElementById('confirmText').textContent = `Удалить сотрудника «${emp.name}» и всю его историю баллов? Действие необратимо.`;
  document.getElementById('confirmActionBtn').onclick = () => {
    state.employees = state.employees.filter(x => x.id !== id);
    state.events = state.events.filter(x => x.employeeId !== id);
    closeModal('overlayConfirm');
    renderAll();
    showToast('Сотрудник удалён');
  };
  openModal('overlayConfirm');
}

/* ===================== Events: опоздание (quick) ===================== */

function addLateEvent(employeeId) {
  const ev = { id: uid(), employeeId, type: 'late', points: 1, date: todayISODate(), comment: 'Опоздание на встречу', createdAt: new Date().toISOString() };
  state.events.push(ev);
  renderAll();
  showToast('Опоздание зафиксировано (+1 балл)', () => {
    state.events = state.events.filter(x => x.id !== ev.id);
    renderAll();
  });
}

/* ===================== Events: начисление / списание ===================== */

let pointsSign = 1;

document.querySelectorAll('.segmented-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.segmented-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    pointsSign = Number(btn.dataset.sign);
    document.getElementById('pointsSign').value = pointsSign;
  });
});

function openPointsModal(employeeId) {
  const emp = state.employees.find(x => x.id === employeeId);
  if (!emp) return;
  document.getElementById('pointsEmployeeId').value = employeeId;
  document.getElementById('pointsEmployeeName').textContent = emp.name;
  document.getElementById('pointsAmount').value = '';
  document.getElementById('pointsComment').value = '';
  document.getElementById('pointsDate').value = todayISODate();
  pointsSign = 1;
  document.getElementById('pointsSign').value = 1;
  document.querySelectorAll('.segmented-btn').forEach(b => b.classList.toggle('active', b.dataset.sign === '1'));
  openModal('overlayPoints');
  document.getElementById('pointsAmount').focus();
}

document.getElementById('formPoints').addEventListener('submit', (e) => {
  e.preventDefault();
  const employeeId = document.getElementById('pointsEmployeeId').value;
  const amount = Number(document.getElementById('pointsAmount').value);
  const date = document.getElementById('pointsDate').value;
  const comment = document.getElementById('pointsComment').value.trim();
  if (!employeeId || !amount || amount <= 0 || !comment || !date) return;

  const ev = {
    id: uid(),
    employeeId,
    type: 'manual',
    points: pointsSign * Math.round(amount),
    date,
    comment,
    createdAt: new Date().toISOString()
  };
  state.events.push(ev);
  closeModal('overlayPoints');
  renderAll();
  showToast(pointsSign > 0 ? 'Баллы начислены' : 'Баллы списаны');
});

/* ===================== History ===================== */

function openHistory(employeeId) {
  const emp = state.employees.find(x => x.id === employeeId);
  if (!emp) return;
  document.getElementById('modalHistoryTitle').textContent = `История: ${emp.name}`;

  const events = state.events
    .filter(x => x.employeeId === employeeId)
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));

  const list = document.getElementById('historyList');
  const empty = document.getElementById('historyEmpty');
  list.innerHTML = '';

  if (events.length === 0) {
    empty.hidden = false;
  } else {
    empty.hidden = true;
    events.forEach(ev => {
      const li = document.createElement('li');
      li.className = 'history-item';
      const pointsClass = ev.points > 0 ? 'positive' : 'negative';
      const sign = ev.points > 0 ? '+' : '';
      const typeLabel = ev.type === 'late' ? 'Опоздание' : (ev.points > 0 ? 'Начисление' : 'Списание');
      li.innerHTML = `
        <div class="history-meta">
          <div class="history-date">${formatDateRu(ev.date)} · ${typeLabel}</div>
          <div class="history-comment">${escapeHtml(ev.comment || '')}</div>
        </div>
        <span class="history-points ${pointsClass}">${sign}${ev.points}</span>
        <button class="btn-icon danger" data-delete-event="${ev.id}" title="Удалить запись" aria-label="Удалить запись">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      `;
      list.appendChild(li);
    });
  }

  openModal('overlayHistory');
}

function formatDateRu(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTH_NAMES[m - 1]} ${y}`;
}

document.getElementById('historyList').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-delete-event]');
  if (!btn) return;
  const eventId = btn.dataset.deleteEvent;
  const ev = state.events.find(x => x.id === eventId);
  if (!ev) return;
  const employeeId = ev.employeeId;
  state.events = state.events.filter(x => x.id !== eventId);
  renderAll();
  openHistory(employeeId);
});

/* ===================== Delegated action clicks ===================== */

document.getElementById('employeesBody').addEventListener('click', (e) => {
  const nameCell = e.target.closest('[data-open-history]');
  const actionBtn = e.target.closest('[data-action]');
  if (actionBtn) {
    const id = actionBtn.dataset.id;
    const action = actionBtn.dataset.action;
    if (action === 'add-late') addLateEvent(id);
    else if (action === 'edit-points') openPointsModal(id);
    else if (action === 'history') openHistory(id);
    else if (action === 'edit-employee') openEditEmployee(id);
    else if (action === 'delete-employee') deleteEmployee(id);
    return;
  }
  if (nameCell) openHistory(nameCell.dataset.openHistory);
});

document.getElementById('ratingBody').addEventListener('click', (e) => {
  const cell = e.target.closest('[data-open-history]');
  if (cell) openHistory(cell.dataset.openHistory);
});

/* ===================== Export / Import ===================== */

document.getElementById('btnExport').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = todayISODate();
  a.href = url;
  a.download = `eballs-backup-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

document.getElementById('btnImport').addEventListener('click', () => {
  document.getElementById('importFile').click();
});

document.getElementById('importFile').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    let parsed;
    try {
      parsed = JSON.parse(reader.result);
    } catch (err) {
      showToast('Файл повреждён или не является JSON');
      e.target.value = '';
      return;
    }
    if (!parsed || !Array.isArray(parsed.employees) || !Array.isArray(parsed.events)) {
      showToast('Неверный формат файла');
      e.target.value = '';
      return;
    }
    document.getElementById('confirmText').textContent = 'Импорт заменит все текущие данные (сотрудников и историю баллов). Продолжить?';
    document.getElementById('confirmActionBtn').onclick = () => {
      state = { employees: parsed.employees, events: parsed.events };
      closeModal('overlayConfirm');
      renderAll();
      showToast('Данные импортированы');
    };
    openModal('overlayConfirm');
    e.target.value = '';
  };
  reader.readAsText(file);
});

/* ===================== Init ===================== */

document.getElementById('pointsDate').value = todayISODate();
renderAll();
