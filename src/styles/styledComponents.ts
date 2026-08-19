import styled from 'styled-components';
import { AppTheme } from './theme';

export const Shell = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;

export const PageHeader = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const Eyebrow = styled.div`
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }: { theme: AppTheme }) => theme.mut};
  font-weight: 600;
`;

export const PageTitle = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin-top: 6px;
  color: ${({ theme }: { theme: AppTheme }) => theme.fg};
`;

export const PageDesc = styled.p`
  font-size: 13.5px;
  color: ${({ theme }: { theme: AppTheme }) => theme.sub};
  margin-top: 4px;
  max-width: 520px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.btnBd};
  background: ${({ theme }: { theme: AppTheme }) => theme.btnBg};
  color: ${({ theme }: { theme: AppTheme }) => theme.fg};
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.fg};
  }
`;

export const NavTabs = styled.div`
  display: inline-flex;
  gap: 4px;
  background: ${({ theme }: { theme: AppTheme }) => theme.btnBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.bd};
  border-radius: 11px;
  padding: 4px;
`;

export const NavTabButton = styled.button<{ active?: boolean }>`
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
  background: ${({ active, theme }: { active?: boolean; theme: AppTheme }) =>
    active ? theme.accentLime : 'transparent'};
  color: ${({ active, theme }: { active?: boolean; theme: AppTheme }) =>
    active ? '#111' : theme.tabIdle};
  transition: all 0.15s ease;

  .nav-tab-tag {
    font-size: 10px;
    opacity: 0.7;
    font-family: 'IBM Plex Mono', monospace;
  }
`;

export const ScreenContainer = styled.section<{ active?: boolean }>`
  display: ${({ active }) => (active ? 'block' : 'none')};
  animation: fadeIn 0.25s ease;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 18px;
`;

export const PeriodTabs = styled.div`
  display: inline-flex;
  gap: 4px;
  background: ${({ theme }: { theme: AppTheme }) => theme.btnBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.bd};
  border-radius: 10px;
  padding: 4px;
`;

export const PeriodTabButton = styled.button<{ active?: boolean }>`
  border: none;
  border-radius: 8px;
  padding: 8px 15px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  background: ${({ active, theme }: { active?: boolean; theme: AppTheme }) =>
    active ? theme.accentLime : 'transparent'};
  color: ${({ active, theme }: { active?: boolean; theme: AppTheme }) =>
    active ? '#111' : theme.tabIdle};
  transition: all 0.15s ease;
`;

export const PeriodNav = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const PeriodIconBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.btnBd};
  background: ${({ theme }: { theme: AppTheme }) => theme.btnBg};
  color: ${({ theme }: { theme: AppTheme }) => theme.fg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.fg};
  }
`;

export const PeriodLabel = styled.span`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  padding: 0 4px;
  color: ${({ theme }: { theme: AppTheme }) => theme.fg};
`;

export const GhostSmBtn = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.btnBd};
  color: ${({ theme }: { theme: AppTheme }) => theme.btnFg};
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.fg};
    color: ${({ theme }: { theme: AppTheme }) => theme.fg};
  }
`;

export const LimeButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }: { theme: AppTheme }) => theme.accentLime};
  color: #111;
  border: none;
  border-radius: 10px;
  padding: 11px 18px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  transition: transform 0.1s ease, filter 0.15s ease;

  &:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
  }
`;

/* PODIUM */
export const PodiumCard = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.fbg};
  border-radius: 18px;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.fbd};
  padding: 26px 22px 24px;
  font-family: 'Space Grotesk', sans-serif;
`;

export const PodiumHeaderTitle = styled.div`
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }: { theme: AppTheme }) => theme.fmut};
  margin-bottom: 22px;
`;

export const PodiumGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 14px;
  align-items: end;
  max-width: 720px;
  margin: 0 auto 26px;
`;

export const PodiumCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const AvatarWrap = styled.div`
  position: relative;
`;

export const MedalImg = styled.img`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 56px;
  height: 56px;
  object-fit: contain;
  z-index: 2;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4));
`;

export const AvatarCircle = styled.div<{ size: string; color: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  background: #1c1c2b;
  border: 2px dashed ${({ color }) => color};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
`;

export const RankBadge = styled.div<{ color: string }>`
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${({ color }) => color};
  color: #101019;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'IBM Plex Mono', monospace;
`;

export const PodiumInfo = styled.div`
  text-align: center;
`;

export const PodiumName = styled.div`
  font-weight: 700;
  font-size: 14.5px;
  color: #ececf5;
`;

export const PodiumRole = styled.div`
  font-size: 11.5px;
  color: #8a8aa0;
  margin-top: 2px;
`;

export const PodiumStand = styled.div<{ height: string; color: string }>`
  width: 100%;
  height: ${({ height }) => height};
  border-radius: 12px 12px 0 0;
  border-style: solid;
  border-width: 1px 1px 0 1px;
  border-color: ${({ color }) => color};
  background: linear-gradient(180deg, ${({ color }) => color} 0%, rgba(255, 255, 255, 0) 260%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 14px;
`;

export const PodiumPoints = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 26px;
  color: #fff;
`;

export const PodiumUnit = styled.div`
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 2px;
`;

/* REST LIST */
export const RestListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 820px;
  margin: 0 auto;
`;

export const RestItemRow = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 90px 90px 40px;
  align-items: center;
  gap: 12px;
  background: ${({ theme }: { theme: AppTheme }) => theme.finp};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.fbd};
  border-radius: 12px;
  padding: 11px 16px;
  font-family: 'Space Grotesk', sans-serif;
`;

export const RestRank = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.fmut};
`;

export const RestUser = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
`;

export const RestAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex: none;
  background: ${({ theme }: { theme: AppTheme }) => theme.fbg};
  border: 1px dashed ${({ theme }: { theme: AppTheme }) => theme.fbd};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.fmut};
`;

export const RestName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }: { theme: AppTheme }) => theme.ffg};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RestRole = styled.div`
  font-size: 11.5px;
  color: ${({ theme }: { theme: AppTheme }) => theme.fmut};
`;

export const RestLate = styled.div`
  text-align: right;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: ${({ theme }: { theme: AppTheme }) => theme.fmut};
`;

export const RestPoints = styled.div`
  text-align: right;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 16px;
  color: #ff8a8a;
`;

export const QuickLateButton = styled.button`
  justify-self: end;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.fbd};
  background: transparent;
  color: ${({ theme }: { theme: AppTheme }) => theme.fmut};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    border-color: #ff8a8a;
    color: #ff8a8a;
  }
`;

/* RECENT FEED */
export const RecentFeedContainer = styled.div`
  max-width: 1180px;
  margin: 26px auto 0;
`;

export const FeedEyebrow = styled.div`
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }: { theme: AppTheme }) => theme.mut};
  font-weight: 600;
  margin-bottom: 12px;
`;

export const FeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const FeedItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  background: ${({ theme }: { theme: AppTheme }) => theme.panel};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.bd};
  border-radius: 11px;
  padding: 10px 15px;
`;

export const FeedIconBox = styled.div<{ bg: string; color: string }>`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
`;

export const FeedInfo = styled.div`
  min-width: 0;
  flex: 1;
`;

export const FeedTitle = styled.div`
  font-size: 13.5px;
  color: ${({ theme }: { theme: AppTheme }) => theme.fg};

  strong {
    font-weight: 600;
  }
`;

export const FeedSub = styled.div`
  font-size: 11.5px;
  color: ${({ theme }: { theme: AppTheme }) => theme.sub};
  margin-top: 2px;
`;

export const FeedPoints = styled.div<{ color: string }>`
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 15px;
  color: ${({ color }) => color};
`;

export const FeedPhoto = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  object-fit: cover;
  flex: none;
`;

/* EMPLOYEES */
export const EmployeesCard = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.panel};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.bd};
  border-radius: 16px;
  padding: 16px;
`;

export const EmployeeItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.bd};

  &:last-child {
    border-bottom: none;
  }
`;

export const EmployeeInfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const EmployeeAvatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: ${({ theme }: { theme: AppTheme }) => theme.fbg};
  border: 1px dashed ${({ theme }: { theme: AppTheme }) => theme.fbd};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  color: ${({ theme }: { theme: AppTheme }) => theme.facc};
`;

export const EmployeeActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.btnBd};
  color: ${({ theme }: { theme: AppTheme }) => theme.fg};
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.facc};
    color: ${({ theme }: { theme: AppTheme }) => theme.facc};
  }
`;

export const DangerActionButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 138, 138, 0.3);
  color: #ff8a8a;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: rgba(255, 138, 138, 0.1);
    border-color: #ff8a8a;
  }
`;

/* TOAST */
export const ToastContainer = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }: { theme: AppTheme }) => theme.toastBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.toastBd};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  z-index: 200;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  animation: pop 0.2s ease;
  color: ${({ theme }: { theme: AppTheme }) => theme.toastFg};
  font-size: 14px;
`;

export const ToastUndoButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }: { theme: AppTheme }) => theme.accentLime};
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  font-family: inherit;
`;

export const EmptyInline = styled.div`
  text-align: center;
  color: ${({ theme }: { theme: AppTheme }) => theme.empty};
  font-size: 13.5px;
  padding: 24px;
`;

/* FORM & CHIP STYLES */
export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

export const FieldLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }: { theme: AppTheme }) => theme.fmut};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

export const ChipButton = styled.button<{ selected?: boolean }>`
  padding: 7px 12px;
  border-radius: 99px;
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  border: 1px solid
    ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
      selected ? theme.facc : theme.fbd};
  background: ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
    selected ? theme.facc : 'transparent'};
  color: ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
    selected ? theme.faccfg : theme.fmut};
  transition: all 0.15s ease;
`;

export const TypeOptionBtn = styled.button<{ selected?: boolean }>`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  border: 1px solid
    ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
      selected ? theme.facc : theme.fbd};
  background: ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
    selected ? theme.facc : 'transparent'};
  color: ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
    selected ? theme.faccfg : theme.fmut};
  text-align: center;
  transition: all 0.15s ease;
`;

export const QuickAmountBtn = styled.button<{ selected?: boolean }>`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  font-weight: 700;
  font-family: 'IBM Plex Mono', monospace;
  cursor: pointer;
  border: 1px solid
    ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
      selected ? theme.facc : theme.fbd};
  background: ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
    selected ? theme.facc : 'transparent'};
  color: ${({ selected, theme }: { selected?: boolean; theme: AppTheme }) =>
    selected ? theme.faccfg : theme.fmut};
  text-align: center;
  transition: all 0.15s ease;
`;

export const UploadBoxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 13px;
  border: 1px dashed ${({ theme }: { theme: AppTheme }) => theme.fbd};
  border-radius: 12px;
  padding: 13px;
  cursor: pointer;
  color: ${({ theme }: { theme: AppTheme }) => theme.fmut};
  font-size: 13px;

  &:hover {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.facc};
  }
`;

export const ModalActionsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 6px;
`;

export const ModalCancelBtn = styled.button`
  flex: none;
  background: transparent;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.fbd};
  color: ${({ theme }: { theme: AppTheme }) => theme.fmut};
  border-radius: 11px;
  padding: 13px 20px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.ffg};
    color: ${({ theme }: { theme: AppTheme }) => theme.ffg};
  }
`;

export const ModalSubmitBtn = styled.button`
  flex: 1;
  background: ${({ theme }: { theme: AppTheme }) => theme.facc};
  color: ${({ theme }: { theme: AppTheme }) => theme.faccfg};
  border: none;
  border-radius: 11px;
  padding: 13px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
`;

export const ModalDangerBtn = styled.button`
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
`;
