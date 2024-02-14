/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useContextMenuRequest, useEditor } from '@layerhub-io/react';
import { useStyletron } from 'baseui';
import { useTranslation } from 'react-i18next';

import BringToFront from '../../../../components/Icons/BringToFront';
import Delete from '../../../../components/Icons/Delete';
import Duplicate from '../../../../components/Icons/Duplicate';
import Locked from '../../../../components/Icons/Locked';
import Paste from '../../../../components/Icons/Paste';
import SendToBack from '../../../../components/Icons/SendToBack';
import Unlocked from '../../../../components/Icons/Unlocked';

function ContextMenuItem({
  label,
  onClick,
  children,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const [css] = useStyletron();
  return (
    <div
      onClick={onClick}
      className={css({
        display: 'flex',
        height: '32px',
        fontSize: '14px',
        alignItems: 'center',
        padding: '0 1rem',
        gap: '1rem',
        cursor: 'pointer',
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.4 : 1,
        ':hover': {
          backgroundColor: 'rgba(0,0,0,0.075)',
        },
      })}>
      {children} {label}
    </div>
  );
}

function ContextMenu() {
  const contextMenuRequest = useContextMenuRequest();
  const editor = useEditor();
  const { t } = useTranslation();

  if (!contextMenuRequest || !contextMenuRequest.target) {
    return <></>;
  }

  if (contextMenuRequest.target.type === 'Background') {
    return (
      <div // @ts-ignore
        onContextMenu={(e: Event) => e.preventDefault()}
        style={{
          position: 'absolute',
          top: `${contextMenuRequest.top}px`,
          left: `${contextMenuRequest.left}px`,
          zIndex: 129,
          width: '240px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0.5px 2px 7px rgba(0, 0, 0, 0.1)',
          padding: '0.5rem 0',
        }}>
        <ContextMenuItem
          disabled
          onClick={() => {
            editor.objects.copy();
            editor.cancelContextMenuRequest();
          }}
          label={t('editor.copy')}>
          <Duplicate size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            editor.objects.paste();
            editor.cancelContextMenuRequest();
          }}
          label={t('editor.paste')}>
          <Paste size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          disabled
          onClick={() => {
            editor.objects.remove();
            editor.cancelContextMenuRequest();
          }}
          label={t('editor.delete')}>
          <Delete size={24} />
        </ContextMenuItem>
      </div>
    );
  }
  return (
    <>
      {!contextMenuRequest.target.locked ? (
        <div // @ts-ignore
          onContextMenu={(e: Event) => e.preventDefault()}
          style={{
            position: 'absolute',
            top: `${contextMenuRequest.top}px`,
            left: `${contextMenuRequest.left}px`,
            zIndex: 129,
            width: '240px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0.5px 2px 7px rgba(0, 0, 0, 0.1)',
            padding: '0.5rem 0',
          }}>
          <ContextMenuItem
            onClick={() => {
              editor.objects.copy();
              editor.cancelContextMenuRequest();
            }}
            label={t('editor.copy')}>
            <Duplicate size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor.objects.paste();
              editor.cancelContextMenuRequest();
            }}
            label={t('editor.paste')}>
            <Paste size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor.objects.remove();
              editor.cancelContextMenuRequest();
            }}
            label={t('editor.delete')}>
            <Delete size={24} />
          </ContextMenuItem>
          <div style={{ margin: '0.5rem 0' }} />
          <ContextMenuItem
            onClick={() => {
              editor.objects.bringForward();
              editor.cancelContextMenuRequest();
            }}
            label={t('editor.bringToFront')}>
            <BringToFront size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor.objects.sendBackwards();
              editor.cancelContextMenuRequest();
            }}
            label={t('editor.sentToBack')}>
            <SendToBack size={24} />
          </ContextMenuItem>
          <div style={{ margin: '0.5rem 0' }} />
          <ContextMenuItem
            onClick={() => {
              editor.objects.lock();
              editor.cancelContextMenuRequest();
            }}
            label={t('editor.block')}>
            <Locked size={24} />
          </ContextMenuItem>
        </div>
      ) : (
        <div // @ts-ignore
          onContextMenu={(e: Event) => e.preventDefault()}
          style={{
            position: 'absolute',
            top: `${contextMenuRequest.top}px`,
            left: `${contextMenuRequest.left}px`,
            zIndex: 129,
            width: '240px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0.5px 2px 7px rgba(0, 0, 0, 0.1)',
            padding: '0.5rem 0',
          }}>
          <ContextMenuItem
            onClick={() => {
              editor.objects.unlock();
              editor.cancelContextMenuRequest();
            }}
            label={t('editor.unBlock')}>
            <Unlocked size={24} />
          </ContextMenuItem>
        </div>
      )}
    </>
  );
}

export default ContextMenu;
