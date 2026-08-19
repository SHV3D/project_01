export type EventType = 'late' | 'penalty' | 'reward';
export type PeriodType = 'week' | 'month' | 'all';
export type ThemeMode = 'dark' | 'light';
export type ScreenType = 'rating' | 'employees';

export interface Member {
  id: string;
  name: string;
  role: string;
}

export interface RatingEvent {
  id: string;
  memberId: string;
  type: EventType;
  points: number;
  date: string; // ISO format YYYY-MM-DD
  reason: string;
  photo?: string | null;
}

export interface RankedMember extends Member {
  initials: string;
  points: number;
  late: number;
  rank: number;
}

export interface AwardFormData {
  memberIds: string[];
  type: EventType;
  amount: number;
  reasons: string[];
  reasonText: string;
  photo: string | null;
  date: string;
}

export interface ToastState {
  message: string;
  canUndo: boolean;
  visible: boolean;
}
