export interface AppTheme {
  bg: string;
  fg: string;
  mut: string;
  sub: string;
  panel: string;
  bd: string;
  btnBg: string;
  btnBd: string;
  btnFg: string;
  tabIdle: string;
  empty: string;
  toastBg: string;
  toastBd: string;
  toastFg: string;

  fbg: string;
  ffg: string;
  fbd: string;
  fmut: string;
  finp: string;
  facc: string;
  faccfg: string;

  accentLime: string;
  penaltyRed: string;
  rewardGreen: string;
  gold: string;
  silver: string;
  bronze: string;
}

export const darkTheme: AppTheme = {
  bg: '#0d0d10',
  fg: '#e7e7ea',
  mut: '#6f6f7a',
  sub: '#9a9aa6',
  panel: '#16161c',
  bd: '#26262e',
  btnBg: '#17171c',
  btnBd: '#2a2a32',
  btnFg: '#c8c8d0',
  tabIdle: '#8a8a94',
  empty: '#6a6a74',
  toastBg: '#1c1c24',
  toastBd: '#33333f',
  toastFg: '#e7e7ea',

  fbg: '#16161f',
  ffg: '#ececf5',
  fbd: '#2c2c40',
  fmut: '#8a8aa0',
  finp: '#101019',
  facc: '#e5b567',
  faccfg: '#101019',

  accentLime: '#d7ff2e',
  penaltyRed: '#ff8a8a',
  rewardGreen: '#6ee7a0',
  gold: '#e5b567',
  silver: '#c0c0cc',
  bronze: '#cd7f4d'
};

export const lightTheme: AppTheme = {
  bg: '#edece7',
  fg: '#1a1a1e',
  mut: '#78766d',
  sub: '#57554d',
  panel: '#ffffff',
  bd: '#e3e1da',
  btnBg: '#ffffff',
  btnBd: '#dddbd3',
  btnFg: '#45443e',
  tabIdle: '#78766d',
  empty: '#9a988c',
  toastBg: '#ffffff',
  toastBd: '#dddbd3',
  toastFg: '#1a1a1e',

  fbg: '#ffffff',
  ffg: '#17171a',
  fbd: '#e4e2dc',
  fmut: '#8a8a80',
  finp: '#f6f5f2',
  facc: '#e5b567',
  faccfg: '#101019',

  accentLime: '#d7ff2e',
  penaltyRed: '#e5484d',
  rewardGreen: '#30a46c',
  gold: '#e5b567',
  silver: '#a0a0b0',
  bronze: '#cd7f4d'
};
