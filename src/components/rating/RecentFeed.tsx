import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreContext';
import { formatDateStr } from '../../utils/dateUtils';
import {
  EmptyInline,
  FeedEyebrow,
  FeedIconBox,
  FeedInfo,
  FeedItemRow,
  FeedList,
  FeedPhoto,
  FeedPoints,
  FeedSub,
  FeedTitle,
  RecentFeedContainer
} from '../../styles/styledComponents';
import { EventType } from '../../types';

interface TypeMeta {
  label: string;
  icon: string;
  tint: string;
  color: string;
}

const TYPE_META: Record<EventType, TypeMeta> = {
  late: { label: 'Опоздание', icon: '⏱', tint: 'rgba(193,18,31,.16)', color: '#ff8a8a' },
  penalty: { label: 'Штраф', icon: '⚠', tint: 'rgba(245,158,11,.16)', color: '#f5b23c' },
  reward: { label: 'Награда', icon: '★', tint: 'rgba(34,197,94,.16)', color: '#6ee7a0' }
};

export const RecentFeed: React.FC = observer(() => {
  const store = useStore();
  const events = store.recentEvents;

  return (
    <RecentFeedContainer>
      <FeedEyebrow>Последние начисления</FeedEyebrow>

      {events.length === 0 ? (
        <EmptyInline>Начислений пока нет.</EmptyInline>
      ) : (
        <FeedList>
          {events.map(ev => {
            const meta = TYPE_META[ev.type] || TYPE_META.late;
            const ptsStr = (ev.points > 0 ? '+' : '') + ev.points;
            const ptsColor = ev.points > 0 ? '#ff8a8a' : '#6ee7a0';

            return (
              <FeedItemRow key={ev.id}>
                {ev.photo && (
                  <FeedPhoto src={ev.photo} alt="Доказательство" />
                )}

                <FeedIconBox bg={meta.tint} color={meta.color}>
                  {meta.icon}
                </FeedIconBox>

                <FeedInfo>
                  <FeedTitle>
                    <strong>{ev.memberName}</strong> — {ev.reason}
                  </FeedTitle>
                  <FeedSub>
                    {meta.label} · {formatDateStr(ev.date)}
                  </FeedSub>
                </FeedInfo>

                <FeedPoints color={ptsColor}>{ptsStr}</FeedPoints>
              </FeedItemRow>
            );
          })}
        </FeedList>
      )}
    </RecentFeedContainer>
  );
});
