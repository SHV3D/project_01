import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/StoreContext';
import {
  Eyebrow,
  HeaderRight,
  NavTabButton,
  NavTabs,
  PageDesc,
  PageHeader,
  PageTitle,
  ThemeButton
} from '../styles/styledComponents';

export const Header: React.FC = observer(() => {
  const store = useStore();

  return (
    <PageHeader>
      <div>
        <Eyebrow>Антирейтинг команды · штрафные баллы</Eyebrow>
        <PageTitle>Анти-подиум</PageTitle>
        <PageDesc>Пьедестал позора для топ-3 нарушителей плюс список остальных.</PageDesc>
      </div>

      <HeaderRight>
        <ThemeButton
          onClick={store.toggleTheme}
          title={store.theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
          aria-label="Переключить тему"
        >
          {store.theme === 'dark' ? '☀' : '☾'}
        </ThemeButton>

        <NavTabs role="tablist" aria-label="Экраны">
          <NavTabButton
            active={store.currentScreen === 'rating'}
            onClick={() => store.setScreen('rating')}
            role="tab"
            aria-selected={store.currentScreen === 'rating'}
          >
            <span className="nav-tab-tag">01</span>
            <span>Рейтинг</span>
          </NavTabButton>

          <NavTabButton
            active={store.currentScreen === 'employees'}
            onClick={() => store.setScreen('employees')}
            role="tab"
            aria-selected={store.currentScreen === 'employees'}
          >
            <span className="nav-tab-tag">02</span>
            <span>Сотрудники</span>
          </NavTabButton>
        </NavTabs>
      </HeaderRight>
    </PageHeader>
  );
});
