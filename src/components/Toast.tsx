import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/StoreContext';
import { ToastContainer, ToastUndoButton } from '../styles/styledComponents';

export const Toast: React.FC = observer(() => {
  const store = useStore();
  const { toast } = store;

  if (!toast.visible) return null;

  return (
    <ToastContainer>
      <span>{toast.message}</span>
      {toast.canUndo && (
        <ToastUndoButton onClick={store.undoLastAction}>
          Отменить
        </ToastUndoButton>
      )}
    </ToastContainer>
  );
});
