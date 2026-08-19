import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreContext';
import { triggerEmojiBurst } from '../../utils/emojiBurst';
import {
  QuickLateButton,
  RestAvatar,
  RestItemRow,
  RestLate,
  RestListContainer,
  RestName,
  RestPoints,
  RestRank,
  RestRole,
  RestUser
} from '../../styles/styledComponents';
import { ClockCircleOutlined } from '@ant-design/icons';

export const RestList: React.FC = observer(() => {
  const store = useStore();
  const rest = store.restMembers;

  if (rest.length === 0) return null;

  const handleQuickLate = (e: React.MouseEvent<HTMLButtonElement>, memberId: string) => {
    triggerEmojiBurst(e.currentTarget);
    store.quickLate(memberId);
  };

  return (
    <RestListContainer>
      {rest.map(r => (
        <RestItemRow key={r.id}>
          <RestRank>{r.rank}</RestRank>

          <RestUser>
            <RestAvatar>{r.initials}</RestAvatar>
            <div style={{ minWidth: 0 }}>
              <RestName>{r.name}</RestName>
              <RestRole>{r.role || '—'}</RestRole>
            </div>
          </RestUser>

          <RestLate>{r.late} оп.</RestLate>
          <RestPoints>{r.points > 0 ? `+${r.points}` : r.points}</RestPoints>

          <QuickLateButton
            onClick={e => handleQuickLate(e, r.id)}
            title="Опоздание +1"
            aria-label="Быстрое опоздание +1"
          >
            <ClockCircleOutlined style={{ fontSize: 14 }} />
          </QuickLateButton>
        </RestItemRow>
      ))}
    </RestListContainer>
  );
});
