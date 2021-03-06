import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from './Button';
import Strings from './constants/strings';
import { useOutsideClick } from './hooks/useOutsideClick';

import styles from './styles/Dialog';
import TabTrap from './TabTrap';

function DialogContent({ name, isForm, children }) {
  if (!isForm) {
    return <div className="dialog-content">{children}</div>;
  }

  if (isForm) {
    return (
      <form
        className="dialog-content"
        name={name}
        noValidate
        autoComplete="off"
      >
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
  hasBackdrop,
  hideCancel,
  style,
  className,
  ...props
}) {
  const dialogRef = useRef();
  const tabTrapRef = useRef();

  useOutsideClick(isOpen && dialogRef.current, props.onCancel);

  const hasTitle = !!title;
  const hasAction = !!props.onAction;
  const hasCancel = !!props.onCancel && !hideCancel;
  const dialogStyle = {
    top: `calc(${window.scrollY}px + 50vh)`,
    ...style
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
        !hasBackdrop && styles.dialog_noBackdrop,
        className
      )}
    >
      <TabTrap ref={tabTrapRef} isActive={isOpen} {...props.tabTrapProps}>
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
                  id={`${name}Action`}
                  className="dialog__action"
                  onClick={handleAction}
                >
                  {props.actionText}
                </Button>
              )}
              {hasCancel && (
                <Button
                  id={`${name}Cancel`}
                  className="dialog__cancel"
                  onClick={props.onCancel}
                >
                  {Strings.cancel}
                </Button>
              )}
            </div>
          </DialogContent>
        </div>
      </TabTrap>
    </dialog>
  );
}

Dialog.displayName = 'Dialog';
Dialog.defaultProps = {
  isForm: true,
  hasBackdrop: true,
  hideCancel: false,
  actionText: 'Submit',
  style: {}
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isForm: PropTypes.bool,
  hasBackdrop: PropTypes.bool,
  hideCancel: PropTypes.bool,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
  onCancel: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  tabTrapProps: PropTypes.shape({
    firstId: PropTypes.string.isRequired,
    lastId: PropTypes.string.isRequired,
    onDeactivate: PropTypes.func
  }).isRequired
};

export default Dialog;
