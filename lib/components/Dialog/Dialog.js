import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { Button } from 'components/Button/Button';
import Strings from 'constants/strings';
import { createListeners } from 'utils/common';

import styles from './Dialog.scss';

const cx = classNames.bind(styles);

const DialogContent = ({ name, isForm, children }) => {
  if (!isForm) return <div>{children}</div>;

  if (isForm)
    return (
      <form name={name} noValidate="" autoComplete="off">
        {children}
      </form>
    );
};

const handleDialogClick = dialog => event => {
  const rect = dialog.self.getBoundingClientRect();
  const isInDialog =
    rect.top <= event.clientY &&
    event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX &&
    event.clientX <= rect.left + rect.width;

  if (isInDialog || !event.isTrusted) return;
  dialog.self.close();
};

class Dialog extends Component {
  constructor() {
    super();

    this.handleRef = this.handleRef.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillUnmount() {
    this.listeners.remove();
  }

  handleRef(element) {
    if (!element) return;

    this.self = element;
    this.props.getDialogRef(element);
    this.listeners = createListeners('click', handleDialogClick(this))(
      this.self
    );
    this.listeners.listen();
  }

  handleClose() {
    this.self.close();
    if (this.props.onClose) this.props.onClose();
  }

  handleAction(event) {
    event.preventDefault();
    if (this.props.action) this.props.action(event);
  }

  render() {
    const dialogStyle = {
      top: !!this.props.localised ? '0' : `calc(${window.scrollY}px + 50vh)`
    };
    const dialogClass = cx(
      'dialog',
      { backdrop: this.props.hasBackdrop },
      { 'no-backdrop': !this.props.hasBackdrop }
    );
    const hasTitle = !!this.props.title;
    const hasAction = !!this.props.action;

    return (
      <dialog ref={this.handleRef} style={dialogStyle} className={dialogClass}>
        <div className={cx('dialog-content')}>
          <DialogContent name={this.props.name} isForm={this.props.isForm}>
            {hasTitle && (
              <h4 className={cx('dialog-title')}>{this.props.title}</h4>
            )}
            <div className={cx('dialog-content-custom')}>
              {this.props.children}
            </div>
            <div className="button-group">
              {hasAction && (
                <Button
                  type={this.props.isForm ? 'submit' : 'button'}
                  className="ripple"
                  onClick={this.handleAction}
                >
                  {this.props.actionText}
                </Button>
              )}
              {!this.props.hideCancel && (
                <Button className="ripple" onClick={this.handleClose}>
                  {Strings.cancel}
                </Button>
              )}
            </div>
          </DialogContent>
        </div>
      </dialog>
    );
  }
}

Dialog.defaultProps = {
  isForm: true,
  hasBackdrop: true,
  hideCancel: false
};

Dialog.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  getDialogRef: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  actionText: PropTypes.string,
  action: PropTypes.func,
  onClose: PropTypes.func,
  isForm: PropTypes.bool,
  hasBackdrop: PropTypes.bool,
  hideCancel: PropTypes.bool
};

export default Dialog;
