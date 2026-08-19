import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreContext';
import { getInitials } from '../../utils/initials';
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
                    color: 'var(--ffg, inherit)'
                  }}
                >
                  {m.name}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: 'var(--fmut, #8a8aa0)',
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
