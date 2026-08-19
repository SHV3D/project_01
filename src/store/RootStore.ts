import { makeAutoObservable } from 'mobx';
import {
  AwardFormData,
  EventType,
  Member,
  PeriodType,
  RankedMember,
  RatingEvent,
  ScreenType,
  ThemeMode,
  ToastState
} from '../types';
import { inPeriod, todayISO, uid } from '../utils/dateUtils';
import { getInitials } from '../utils/initials';
import { DEFAULT_MEMBERS, seedEvents } from '../utils/seedData';

const STORAGE_KEY = 'team_rating_v3_data';

export class RootStore {
  theme: ThemeMode = 'dark';
  currentScreen: ScreenType = 'rating';
  period: PeriodType = 'all';

  members: Member[] = [];
  events: RatingEvent[] = [];
  lastAddedEventIds: string[] | null = null;

  toast: ToastState = {
    message: '',
    canUndo: false,
    visible: false
  };

  private toastTimer: any = null;

  // Modals state
  isAwardModalOpen = false;
  isEmployeeModalOpen = false;
  isDeleteModalOpen = false;

  editingEmployee: Member | null = null;
  deletingEmployee: Member | null = null;

  awardForm: AwardFormData = {
    memberIds: [],
    type: 'late',
    amount: 1,
    reasons: [],
    reasonText: '',
    photo: null,
    date: todayISO()
  };

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  // --- GETTERS (COMPUTED) ---
  get periodLabel(): string {
    const map: Record<PeriodType, string> = {
      week: 'Неделя',
      month: 'Месяц',
      all: 'Всё время'
    };
    return map[this.period] || 'Всё время';
  }

  get rankedMembers(): RankedMember[] {
    const totals = new Map<string, { points: number; late: number }>();
    this.members.forEach(m => totals.set(m.id, { points: 0, late: 0 }));

    this.events.forEach(ev => {
      if (!inPeriod(ev.date, this.period)) return;
      const b = totals.get(ev.memberId);
      if (!b) return;
      b.points += ev.points;
      if (ev.type === 'late') b.late += 1;
    });

    const rows: RankedMember[] = this.members.map(m => {
      const t = totals.get(m.id) || { points: 0, late: 0 };
      return {
        id: m.id,
        name: m.name,
        role: m.role,
        initials: getInitials(m.name),
        points: t.points,
        late: t.late,
        rank: 0
      };
    });

    rows.sort((a, b) => b.points - a.points || b.late - a.late || a.name.localeCompare(b.name, 'ru'));
    rows.forEach((r, i) => {
      r.rank = i + 1;
    });
    return rows;
  }

  get topThree(): RankedMember[] {
    return this.rankedMembers.slice(0, 3);
  }

  get restMembers(): RankedMember[] {
    return this.rankedMembers.slice(3);
  }

  get recentEvents(): (RatingEvent & { memberName: string })[] {
    const memberMap = new Map(this.members.map(m => [m.id, m.name]));
    return [...this.events]
      .reverse()
      .slice(0, 6)
      .map(ev => ({
        ...ev,
        memberName: memberMap.get(ev.memberId) || '—'
      }));
  }

  // --- ACTIONS ---
  setTheme = (theme: ThemeMode) => {
    this.theme = theme;
  };

  toggleTheme = () => {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
  };

  setScreen = (screen: ScreenType) => {
    this.currentScreen = screen;
  };

  setPeriod = (period: PeriodType) => {
    this.period = period;
  };

  prevPeriod = () => {
    if (this.period === 'all') this.period = 'month';
    else if (this.period === 'month') this.period = 'week';
  };

  nextPeriod = () => {
    if (this.period === 'week') this.period = 'month';
    else if (this.period === 'month') this.period = 'all';
  };

  showToast = (message: string, canUndo = false) => {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toast = {
      message,
      canUndo,
      visible: true
    };
    this.toastTimer = setTimeout(() => {
      this.hideToast();
    }, 4500);
  };

  hideToast = () => {
    this.toast.visible = false;
  };

  undoLastAction = () => {
    if (!this.lastAddedEventIds || this.lastAddedEventIds.length === 0) return;
    const idsSet = new Set(this.lastAddedEventIds);
    this.events = this.events.filter(e => !idsSet.has(e.id));
    this.lastAddedEventIds = null;
    this.saveToStorage();
    this.showToast('Начисление отменено', false);
  };

  quickLate = (memberId: string) => {
    const newEv: RatingEvent = {
      id: uid(),
      memberId,
      type: 'late',
      points: 1,
      date: todayISO(),
      reason: 'Опоздание',
      photo: null
    };
    this.events.push(newEv);
    this.lastAddedEventIds = [newEv.id];
    this.saveToStorage();
    this.showToast('Опоздание отмечено (+1)', true);
  };

  // --- AWARD MODAL ACTIONS ---
  openAwardModal = (initialMemberId?: string) => {
    let initialIds: string[] = [];
    if (initialMemberId) {
      initialIds = [initialMemberId];
    } else if (this.members.length > 0) {
      initialIds = [this.members[0].id];
    }

    this.awardForm = {
      memberIds: initialIds,
      type: 'late',
      amount: 1,
      reasons: [],
      reasonText: '',
      photo: null,
      date: todayISO()
    };
    this.isAwardModalOpen = true;
  };

  closeAwardModal = () => {
    this.isAwardModalOpen = false;
  };

  updateAwardForm = (patch: Partial<AwardFormData>) => {
    this.awardForm = { ...this.awardForm, ...patch };
  };

  toggleAwardMember = (memberId: string) => {
    const cur = this.awardForm.memberIds;
    if (cur.includes(memberId)) {
      this.awardForm.memberIds = cur.filter(id => id !== memberId);
    } else {
      this.awardForm.memberIds = [...cur, memberId];
    }
  };

  toggleAwardReason = (reason: string) => {
    const cur = this.awardForm.reasons;
    if (cur.includes(reason)) {
      this.awardForm.reasons = cur.filter(r => r !== reason);
    } else {
      this.awardForm.reasons = [...cur, reason];
    }
  };

  submitAwardForm = () => {
    const f = this.awardForm;
    if (!f.memberIds.length) {
      this.showToast('Выберите хотя бы одного сотрудника');
      return false;
    }

    const combinedReason =
      [...f.reasons, f.reasonText.trim()].filter(Boolean).join(' · ') ||
      (f.type === 'reward' ? 'Награда' : f.type === 'penalty' ? 'Штраф' : 'Опоздание');

    const sign = f.type === 'reward' ? -1 : 1;
    const pts = sign * Math.max(1, Math.round(Math.abs(f.amount || 1)));

    const createdIds: string[] = [];
    f.memberIds.forEach(mid => {
      const ev: RatingEvent = {
        id: uid(),
        memberId: mid,
        type: f.type,
        points: pts,
        date: f.date || todayISO(),
        reason: combinedReason,
        photo: f.photo || null
      };
      this.events.push(ev);
      createdIds.push(ev.id);
    });

    this.lastAddedEventIds = createdIds;
    this.saveToStorage();
    this.closeAwardModal();

    const count = f.memberIds.length;
    this.showToast(count > 1 ? `Начислено ${count} сотрудникам` : 'Баллы начислены', true);
    return true;
  };

  // --- EMPLOYEE CRUD ACTIONS ---
  openAddEmployeeModal = () => {
    this.editingEmployee = null;
    this.isEmployeeModalOpen = true;
  };

  openEditEmployeeModal = (member: Member) => {
    this.editingEmployee = { ...member };
    this.isEmployeeModalOpen = true;
  };

  closeEmployeeModal = () => {
    this.isEmployeeModalOpen = false;
    this.editingEmployee = null;
  };

  saveEmployee = (name: string, role: string) => {
    const trimmedName = name.trim();
    const trimmedRole = role.trim();
    if (!trimmedName) return;

    if (this.editingEmployee) {
      const idx = this.members.findIndex(m => m.id === this.editingEmployee!.id);
      if (idx !== -1) {
        this.members[idx] = {
          ...this.members[idx],
          name: trimmedName,
          role: trimmedRole
        };
      }
      this.showToast('Сотрудник обновлен');
    } else {
      this.members.push({
        id: uid(),
        name: trimmedName,
        role: trimmedRole
      });
      this.showToast('Сотрудник добавлен');
    }

    this.saveToStorage();
    this.closeEmployeeModal();
  };

  openDeleteModal = (member: Member) => {
    this.deletingEmployee = member;
    this.isDeleteModalOpen = true;
  };

  closeDeleteModal = () => {
    this.isDeleteModalOpen = false;
    this.deletingEmployee = null;
  };

  confirmDeleteEmployee = () => {
    if (!this.deletingEmployee) return;
    const targetId = this.deletingEmployee.id;
    this.members = this.members.filter(m => m.id !== targetId);
    this.saveToStorage();
    this.closeDeleteModal();
    this.showToast('Сотрудник удален');
  };

  // --- LOCAL STORAGE SYNC ---
  loadFromStorage = () => {
    try {
      const dataStr = localStorage.getItem(STORAGE_KEY);
      if (dataStr) {
        const data = JSON.parse(dataStr);
        if (data && Array.isArray(data.members) && data.members.length > 0) {
          this.members = data.members;
          this.events = data.events || [];
          return;
        }
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    }
    this.members = DEFAULT_MEMBERS;
    this.events = seedEvents();
    this.saveToStorage();
  };

  saveToStorage = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          members: this.members,
          events: this.events
        })
      );
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  };
}

export const rootStore = new RootStore();
