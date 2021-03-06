import React from 'react';

import {ActionList, ActionListProps} from '../../../ActionList';
import {Popover, PopoverProps} from '../../../Popover';

import {Message, MessageProps} from './components';
import styles from './Menu.scss';

export interface MenuProps {
  /** Accepts an activator component that renders inside of a button that opens the menu */
  activatorContent: React.ReactNode;
  /** An array of action objects that are rendered inside of a popover triggered by this menu */
  actions: ActionListProps['sections'];
  /** Accepts a message that facilitates direct, urgent communication with the merchant through the menu */
  message?: MessageProps;
  /** A boolean property indicating whether the menu is currently open */
  open: boolean;
  /** The preferred alignment of the popover relative to its activator */
  preferredAlignment?: PopoverProps['preferredAlignment'];
  /** A callback function to handle opening the menu popover */
  onOpen(): void;
  /** A callback function to handle closing the menu popover */
  onClose(): void;
}

export function Menu(props: MenuProps) {
  const {
    actions,
    onOpen,
    onClose,
    open,
    activatorContent,
    message,
    preferredAlignment,
  } = props;

  const badgeProps = message &&
    message.badge && {
      content: message.badge.content,
      status: message.badge.status,
    };
  const messageMarkup = message && (
    <Message
      title={message.title}
      description={message.description}
      action={{
        onClick: message.action.onClick,
        content: message.action.content,
      }}
      link={{to: message.link.to, content: message.link.content}}
      badge={badgeProps}
    />
  );

  const isFullHeight = Boolean(message);

  return (
    <Popover
      preferredAlignment={preferredAlignment}
      activator={
        <div className={styles.ActivatorWrapper}>
          <button type="button" className={styles.Activator} onClick={onOpen}>
            {activatorContent}
          </button>
        </div>
      }
      active={open}
      onClose={onClose}
      fixed
      fullHeight={isFullHeight}
    >
      <ActionList onActionAnyItem={onClose} sections={actions} />
      {messageMarkup}
    </Popover>
  );
}
