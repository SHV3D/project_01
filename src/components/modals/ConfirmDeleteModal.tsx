import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal } from 'antd';
import { useStore } from '../../store/StoreContext';
import { ModalActionsRow, ModalCancelBtn, ModalDangerBtn } from '../../styles/styledComponents';

export const ConfirmDeleteModal: React.FC = observer(() => {
  const store = useStore();
  const { deletingEmployee, isDeleteModalOpen } = store;

  if (!deletingEmployee) return null;

  return (
    <Modal
      title="Удалить сотрудника?"
      open={isDeleteModalOpen}
      onCancel={store.closeDeleteModal}
      footer={null}
      destroyOnClose
      width={420}
      centered
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: 14, color: 'var(--fmut, #8a8aa0)', lineHeight: 1.5 }}>
          Вы действительно хотите удалить сотрудника «{deletingEmployee.name}»? Все его начисления сохранятся в истории.
        </p>

        <ModalActionsRow>
          <ModalCancelBtn type="button" onClick={store.closeDeleteModal}>
            Отмена
          </ModalCancelBtn>
          <ModalDangerBtn type="button" onClick={store.confirmDeleteEmployee}>
            Удалить
          </ModalDangerBtn>
        </ModalActionsRow>
      </div>
    </Modal>
  );
});
