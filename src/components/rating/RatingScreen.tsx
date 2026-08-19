import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreContext';
import { EmptyInline, PodiumCard, PodiumHeaderTitle, ScreenContainer } from '../../styles/styledComponents';
import { Toolbar } from './Toolbar';
import { Podium } from './Podium';
import { RestList } from './RestList';
import { RecentFeed } from './RecentFeed';

export const RatingScreen: React.FC = observer(() => {
  const store = useStore();
  const hasMembers = store.members.length > 0;

  return (
    <ScreenContainer active={store.currentScreen === 'rating'}>
      <Toolbar />

      <PodiumCard>
        <PodiumHeaderTitle>Пьедестал позора · топ-3</PodiumHeaderTitle>
        {hasMembers ? (
          <>
            <Podium />
            <RestList />
          </>
        ) : (
          <EmptyInline>
            Нет сотрудников. Добавьте команду на вкладке «Сотрудники».
          </EmptyInline>
        )}
      </PodiumCard>

      <RecentFeed />
    </ScreenContainer>
  );
});
