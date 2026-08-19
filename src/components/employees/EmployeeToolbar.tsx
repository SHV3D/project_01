import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreContext';
import { Eyebrow, LimeButton, PageTitle, Toolbar } from '../../styles/styledComponents';
import { PlusOutlined } from '@ant-design/icons';

export const EmployeeToolbar: React.FC = observer(() => {
  const store = useStore();

  return (
    <Toolbar>
      <div>
        <Eyebrow>Управление командой</Eyebrow>
        <PageTitle style={{ fontSize: 22 }}>Сотрудники</PageTitle>
      </div>

      <LimeButton onClick={store.openAddEmployeeModal}>
        <PlusOutlined style={{ fontSize: 15, strokeWidth: 2.5 }} />
        Добавить сотрудника
      </LimeButton>
    </Toolbar>
  );
});
