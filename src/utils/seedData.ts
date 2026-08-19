import { Member, RatingEvent } from '../types';
import { daysAgo, uid } from './dateUtils';

export const DEFAULT_MEMBERS: Member[] = [
  { id: 'm1', name: 'Артём Кузнецов', role: 'Backend' },
  { id: 'm2', name: 'Мария Соколова', role: 'Дизайнер' },
  { id: 'm3', name: 'Дмитрий Волков', role: 'QA' },
  { id: 'm4', name: 'Елена Морозова', role: 'PM' },
  { id: 'm5', name: 'Иван Лебедев', role: 'Frontend' },
  { id: 'm6', name: 'Ольга Новикова', role: 'Аналитик' },
  { id: 'm7', name: 'Павел Орлов', role: 'DevOps' },
  { id: 'm8', name: 'Анна Зайцева', role: 'Frontend' }
];

export function seedEvents(): RatingEvent[] {
  const R = [
    'Опоздание на дейли',
    'Опоздание на встречу',
    'Сорван дедлайн',
    'Не пришёл без предупреждения',
    'Помог команде',
    'Закрыл инцидент'
  ];

  const raw: [string, 'late' | 'penalty' | 'reward', number, number][] = [
    ['m1', 'late', 1, 1],
    ['m1', 'late', 1, 3],
    ['m1', 'penalty', 5, 2],
    ['m1', 'late', 1, 8],
    ['m3', 'late', 1, 1],
    ['m3', 'late', 1, 2],
    ['m3', 'penalty', 3, 6],
    ['m3', 'late', 1, 12],
    ['m5', 'late', 1, 4],
    ['m5', 'late', 1, 5],
    ['m5', 'penalty', 4, 9],
    ['m7', 'late', 1, 2],
    ['m7', 'late', 1, 6],
    ['m7', 'reward', -2, 3],
    ['m2', 'late', 1, 7],
    ['m2', 'reward', -3, 2],
    ['m4', 'penalty', 3, 10],
    ['m4', 'late', 1, 14],
    ['m6', 'late', 1, 11],
    ['m6', 'reward', -2, 5],
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
