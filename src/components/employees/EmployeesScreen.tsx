import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreContext';
import { ScreenContainer } from '../../styles/styledComponents';
import { EmployeeToolbar } from './EmployeeToolbar';
import { EmployeeList } from './EmployeeList';

export const EmployeesScreen: React.FC = observer(() => {
  const store = useStore();

  return (
    <ScreenContainer active={store.currentScreen === 'employees'}>
      <EmployeeToolbar />
      <EmployeeList />
    </ScreenContainer>
  );
});
