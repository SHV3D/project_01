import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal } from 'antd';
import { useStore } from '../../store/StoreContext';
import { EventType } from '../../types';
import {
  ChipButton,
  ChipRow,
  FieldLabel,
  FormField,
  ModalActionsRow,
  ModalCancelBtn,
  ModalSubmitBtn,
  QuickAmountBtn,
  TypeOptionBtn,
  UploadBoxLabel
} from '../../styles/styledComponents';
import { CameraOutlined, CheckOutlined } from '@ant-design/icons';

const EVENT_TYPES: [EventType, string][] = [
  ['late', 'Опоздание'],
  ['penalty', 'Штраф'],
  ['reward', 'Награда (−)']
];

const PRESETS = [
  'Опоздание на дейли',
  'Опоздание на встречу',
  'Сорван дедлайн',
  'Без предупреждения',
  'Помог команде',
  'Закрыл инцидент'
];

const QUICK_AMOUNTS = [1, 5, 10];

export const AwardModal: React.FC = observer(() => {
  const store = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { awardForm, isAwardModalOpen, members } = store;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        store.updateAwardForm({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.submitAwardForm();
  };

  const count = awardForm.memberIds.length;
  const sign = awardForm.type === 'reward' ? '−' : '+';
  const displayAmount = sign + Math.max(1, Math.round(Math.abs(awardForm.amount || 1)));

  return (
    <Modal
      title="Начислить баллы"
      open={isAwardModalOpen}
      onCancel={store.closeAwardModal}
      footer={null}
      destroyOnClose
      width={500}
      centered
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Member chips */}
        <FormField>
          <FieldLabel>
            <span>Кому начислить</span>
            <span style={{ color: 'var(--facc, #e5b567)' }}>
              выбрано: {count}
            </span>
          </FieldLabel>
          <ChipRow>
            {members.map(m => {
              const selected = awardForm.memberIds.includes(m.id);
              return (
                <ChipButton
                  key={m.id}
                  type="button"
                  selected={selected}
                  onClick={() => store.toggleAwardMember(m.id)}
                >
                  {m.name}
                </ChipButton>
              );
            })}
          </ChipRow>
        </FormField>

        {/* Event type */}
        <FormField>
          <FieldLabel>
            <span>Тип события</span>
          </FieldLabel>
          <div style={{ display: 'flex', gap: 7 }}>
            {EVENT_TYPES.map(([typeKey, label]) => (
              <TypeOptionBtn
                key={typeKey}
                type="button"
                selected={awardForm.type === typeKey}
                onClick={() => store.updateAwardForm({ type: typeKey })}
              >
                {label}
              </TypeOptionBtn>
            ))}
          </div>
        </FormField>

        {/* Amount */}
        <FormField>
          <FieldLabel>
            <span>Баллов</span>
            <span
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontWeight: 700,
                fontSize: 16,
                color: 'var(--facc, #e5b567)'
              }}
            >
              {displayAmount}
            </span>
          </FieldLabel>
          <div style={{ display: 'flex', gap: 7, marginBottom: 8 }}>
            {QUICK_AMOUNTS.map(val => (
              <QuickAmountBtn
                key={val}
                type="button"
                selected={Number(awardForm.amount) === val}
                onClick={() => store.updateAwardForm({ amount: val })}
              >
                +{val}
              </QuickAmountBtn>
            ))}
          </div>
          <input
            type="number"
            min={1}
            step={1}
            value={awardForm.amount}
            onChange={e =>
              store.updateAwardForm({
                amount: Math.max(1, parseInt(e.target.value, 10) || 1)
              })
            }
            style={{
              width: '100%',
              background: 'var(--finp, #101019)',
              border: '1px solid var(--fbd, #2c2c40)',
              borderRadius: 10,
              padding: '11px 13px',
              color: 'var(--ffg, #ececf5)',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 15,
              outline: 'none'
            }}
          />
        </FormField>

        {/* Reasons presets + custom reason */}
        <FormField>
          <FieldLabel>
            <span>Причина · можно выбрать несколько</span>
          </FieldLabel>
          <ChipRow style={{ marginBottom: 9 }}>
            {PRESETS.map(preset => {
              const selected = awardForm.reasons.includes(preset);
              return (
                <ChipButton
                  key={preset}
                  type="button"
                  selected={selected}
                  onClick={() => store.toggleAwardReason(preset)}
                >
                  {selected && <CheckOutlined style={{ marginRight: 4 }} />}
                  {preset}
                </ChipButton>
              );
            })}
          </ChipRow>
          <input
            type="text"
            placeholder="Комментарий…"
            maxLength={120}
            value={awardForm.reasonText}
            onChange={e =>
              store.updateAwardForm({ reasonText: e.target.value })
            }
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

        {/* Proof photo upload */}
        <FormField>
          <FieldLabel>
            <span>Фото-доказательство</span>
          </FieldLabel>
          <UploadBoxLabel onClick={() => fileInputRef.current?.click()}>
            <div style={{ flex: 'none' }}>
              {awardForm.photo ? (
                <img
                  src={awardForm.photo}
                  alt="Превью"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <span
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: 'var(--finp, #101019)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--fmut, #8a8aa0)'
                  }}
                >
                  <CameraOutlined style={{ fontSize: 20 }} />
                </span>
              )}
            </div>
            <span>
              {awardForm.photo
                ? 'Фото прикреплено — нажать для замены'
                : 'Прикрепить фото'}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </UploadBoxLabel>
        </FormField>

        {/* Date picker */}
        <FormField>
          <FieldLabel>
            <span>Дата</span>
          </FieldLabel>
          <input
            type="date"
            value={awardForm.date}
            onChange={e => store.updateAwardForm({ date: e.target.value })}
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

        {/* Actions */}
        <ModalActionsRow>
          <ModalCancelBtn type="button" onClick={store.closeAwardModal}>
            Отмена
          </ModalCancelBtn>
          <ModalSubmitBtn type="submit">
            {count > 1 ? `Начислить ${count}` : 'Начислить'}
          </ModalSubmitBtn>
        </ModalActionsRow>
      </form>
    </Modal>
  );
});
