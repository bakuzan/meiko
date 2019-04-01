import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from './Button';
import Strings from './constants/strings';
import { useOutsideClick } from './hooks/useOutsideClick';

import styles from './styles/Dialog';

function DialogContent({ name, isForm, children }) {
  if (!isForm) {
    return <div>{children}</div>;
  }

  if (isForm) {
    return (
      <form name={name} noValidate autoComplete="off">
        {children}
      </form>
    );
  }
}

function Dialog({
  isOpen,
  isForm,
  title,
  name,
  localised,
  hasBackdrop,
  ...props
}) {
  const dialogRef = useRef();

  useOutsideClick(isOpen && dialogRef.current, props.onClose);

  const hasTitle = !!title;
  const hasAction = !!props.onAction;
  const dialogStyle = {
    top: !!localised ? '0' : `calc(${window.scrollY}px + 50vh)`
  };

  function handleAction(event) {
    event.preventDefault();
    if (props.onAction) {
      props.onAction(event);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      open={isOpen}
      style={dialogStyle}
      className={classNames(
        'dialog',
        {
          'dialog--backdrop': hasBackdrop,
          'dialog--no-backdrop': !hasBackdrop
        },
        styles.dialog,
        hasBackdrop && styles.dialog_backdrop,
        !hasBackdrop && styles.dialog_noBackdrop
      )}
    >
      <div className={classNames('dialog__content')}>
        <DialogContent name={name} isForm={isForm}>
          {hasTitle && (
            <h4 className={classNames('dialog__title', styles.title)}>
              {title}
            </h4>
          )}
          <div
            className={classNames(
              'dialog__content-custom',
              styles.customContent
            )}
          >
            {props.children}
          </div>
          <div className={classNames('dialog__actions', styles.actions)}>
            {hasAction && (
              <Button
                type={isForm ? 'submit' : 'button'}
                onClick={handleAction}
              >
                {props.actionText}
              </Button>
            )}
            {!props.hideCancel && (
              <Button onClick={props.onClose}>{Strings.cancel}</Button>
            )}
          </div>
        </DialogContent>
      </div>
    </dialog>
  );
}

Dialog.displayName = 'Dialog';
Dialog.defaultProps = {
  isForm: true,
  hasBackdrop: true,
  hideCancel: false,
  actionText: 'Submit'
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  isForm: PropTypes.bool,
  hasBackdrop: PropTypes.bool,
  hideCancel: PropTypes.bool
};

export default Dialog;
