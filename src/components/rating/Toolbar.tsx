import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreContext';
import { PeriodType } from '../../types';
import {
  GhostSmBtn,
  LimeButton,
  PeriodIconBtn,
  PeriodLabel,
  PeriodNav,
  PeriodTabButton,
  PeriodTabs,
  Toolbar as ToolbarContainer
} from '../../styles/styledComponents';
import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';

const PERIOD_DEFS: [PeriodType, string][] = [
  ['week', 'Неделя'],
  ['month', 'Месяц'],
  ['all', 'Всё время']
];

export const Toolbar: React.FC = observer(() => {
  const store = useStore();

  return (
    <ToolbarContainer>
      <PeriodTabs role="tablist" aria-label="Период">
        {PERIOD_DEFS.map(([key, label]) => (
          <PeriodTabButton
            key={key}
            active={store.period === key}
            onClick={() => store.setPeriod(key)}
          >
            {label}
          </PeriodTabButton>
        ))}
      </PeriodTabs>

      <PeriodNav>
        <PeriodIconBtn
          onClick={store.prevPeriod}
          aria-label="Предыдущий период"
        >
          <LeftOutlined style={{ fontSize: 13 }} />
        </PeriodIconBtn>

        <PeriodLabel>{store.periodLabel}</PeriodLabel>

        <PeriodIconBtn
          onClick={store.nextPeriod}
          aria-label="Следующий период"
        >
          <RightOutlined style={{ fontSize: 13 }} />
        </PeriodIconBtn>

        <GhostSmBtn onClick={() => store.setPeriod('all')}>
          Сегодня
        </GhostSmBtn>
      </PeriodNav>

      <LimeButton onClick={() => store.openAwardModal()}>
        <PlusOutlined style={{ fontSize: 15, strokeWidth: 2.5 }} />
        Начислить баллы
      </LimeButton>
    </ToolbarContainer>
  );
});
