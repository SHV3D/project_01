import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreContext';
import {
  AvatarCircle,
  AvatarWrap,
  MedalImg,
  PodiumCol,
  PodiumGrid,
  PodiumInfo,
  PodiumName,
  PodiumPoints,
  PodiumRole,
  PodiumStand,
  PodiumUnit,
  RankBadge
} from '../../styles/styledComponents';

export const Podium: React.FC = observer(() => {
  const store = useStore();
  const top3 = store.topThree;

  if (top3.length === 0) return null;

  // Podium order: [2nd, 1st, 3rd]
  const podiumOrder: { data: (typeof top3)[0]; rank: number }[] = [];
  if (top3[1]) podiumOrder.push({ data: top3[1], rank: 2 });
  if (top3[0]) podiumOrder.push({ data: top3[0], rank: 1 });
  if (top3[2]) podiumOrder.push({ data: top3[2], rank: 3 });

  const stylesMap: Record<number, { color: string; height: string; avSize: string }> = {
    1: { color: '#e5b567', height: '150px', avSize: '78px' },
    2: { color: '#c0c0cc', height: '116px', avSize: '66px' },
    3: { color: '#cd7f4d', height: '92px', avSize: '60px' }
  };

  return (
    <PodiumGrid>
      {podiumOrder.map(({ data, rank }) => {
        const st = stylesMap[rank];
        const isFirst = rank === 1;

        return (
          <PodiumCol key={data.id}>
            <AvatarWrap>
              {isFirst && (
                <MedalImg
                  src="/assets/medal-antihero.png"
                  alt="Медаль антигероя"
                  title="Антигерой месяца"
                />
              )}
              <AvatarCircle size={st.avSize} color={st.color}>
                {data.initials}
              </AvatarCircle>
              <RankBadge color={st.color}>{rank}</RankBadge>
            </AvatarWrap>

            <PodiumInfo>
              <PodiumName>{data.name}</PodiumName>
              <PodiumRole>{data.role || '—'}</PodiumRole>
            </PodiumInfo>

            <PodiumStand height={st.height} color={st.color}>
              <PodiumPoints>
                {data.points > 0 ? `+${data.points}` : data.points}
              </PodiumPoints>
              <PodiumUnit>штрафных</PodiumUnit>
            </PodiumStand>
          </PodiumCol>
        );
      })}
    </PodiumGrid>
  );
});
