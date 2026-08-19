import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal } from 'antd';
import { useStore } from '../../store/StoreContext';
import {
  FieldLabel,
  FormField,
  ModalActionsRow,
  ModalCancelBtn,
  ModalSubmitBtn
} from '../../styles/styledComponents';

export const EmployeeModal: React.FC = observer(() => {
  const store = useStore();
  const { editingEmployee, isEmployeeModalOpen } = store;

  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (editingEmployee) {
      setName(editingEmployee.name);
      setRole(editingEmployee.role);
    } else {
      setName('');
      setRole('');
    }
  }, [editingEmployee, isEmployeeModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    store.saveEmployee(name, role);
  };

  const title = editingEmployee ? 'Редактировать сотрудника' : 'Новый сотрудник';

  return (
    <Modal
      title={title}
      open={isEmployeeModalOpen}
      onCancel={store.closeEmployeeModal}
      footer={null}
      destroyOnClose
      width={420}
      centered
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <FormField>
          <FieldLabel>
            <span>ФИО</span>
          </FieldLabel>
          <input
            type="text"
            required
            maxLength={80}
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="например, Иван Иванов"
            style={{
              width: '100%',
              background: 'var(--finp, #101019)',
              border: '1px solid var(--fbd, #2c2c40)',
              borderRadius: 10,
              padding: '11px 13px',
              color: 'var(--ffg, #ececf5)',
              fontSize: 14,
              outline: 'none'
            }}
          />
        </FormField>

        <FormField>
          <FieldLabel>
            <span>Должность</span>
          </FieldLabel>
          <input
            type="text"
            maxLength={80}
            value={role}
            onChange={e => setRole(e.target.value)}
            placeholder="например, Frontend разработчик"
            style={{
              width: '100%',
              background: 'var(--finp, #101019)',
              border: '1px solid var(--fbd, #2c2c40)',
              borderRadius: 10,
              padding: '11px 13px',
              color: 'var(--ffg, #ececf5)',
              fontSize: 14,
              outline: 'none'
            }}
          />
        </FormField>

        <ModalActionsRow>
          <ModalCancelBtn type="button" onClick={store.closeEmployeeModal}>
            Отмена
          </ModalCancelBtn>
          <ModalSubmitBtn type="submit">
            Сохранить
          </ModalSubmitBtn>
        </ModalActionsRow>
      </form>
    </Modal>
  );
});
