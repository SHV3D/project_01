import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';
import { useStore } from '../../store/StoreContext';
import { getInitials } from '../../utils/initials';
import { AppTheme } from '../../styles/theme';
import {
  ActionButton,
  DangerActionButton,
  EmployeeActions,
  EmployeeAvatar,
  EmployeeInfoGroup,
  EmployeeItemRow,
  EmployeesCard,
  EmptyInline
} from '../../styles/styledComponents';

export const EmployeeList: React.FC = observer(() => {
  const store = useStore();
  const members = store.members;
  const theme = useTheme() as AppTheme;

  return (
    <EmployeesCard>
      {members.length === 0 ? (
        <EmptyInline>Список пуст. Добавьте первого сотрудника.</EmptyInline>
      ) : (
        members.map(m => (
          <EmployeeItemRow key={m.id}>
            <EmployeeInfoGroup>
              <EmployeeAvatar>{getInitials(m.name)}</EmployeeAvatar>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    color: theme.ffg
                  }}
                >
                  {m.name}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: theme.fmut,
                    marginTop: 2
                  }}
                >
                  {m.role || 'Должность не указана'}
                </div>
              </div>
            </EmployeeInfoGroup>

            <EmployeeActions>
              <ActionButton onClick={() => store.openEditEmployeeModal(m)}>
                Изменить
              </ActionButton>
              <DangerActionButton onClick={() => store.openDeleteModal(m)}>
                Удалить
              </DangerActionButton>
            </EmployeeActions>
          </EmployeeItemRow>
        ))
      )}
    </EmployeesCard>
  );
});
