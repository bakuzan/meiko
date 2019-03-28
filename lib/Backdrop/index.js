import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { KeyCodes, CLOSE_KEYS, Strings } from '../_constants';
import { createListeners } from '../_utils';
import './Backdrop.scss';

class Backdrop extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    onClickOrKey: PropTypes.func.isRequired
  };
  listeners = null;

  constructor(props) {
    super(props);

    this.handleGlobalClose = this.handleGlobalClose.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.listeners = createListeners('keydown', this.handleGlobalClose)();
    this.listeners.listen();
  }

  componentWillUnmount() {
    this.listeners.remove();
  }

  handleGlobalClose(e) {
    const keyCode = e.keyCode;
    if (keyCode === KeyCodes.escape) {
      this.props.onClickOrKey();
    }
  }

  handleClose(e) {
    if (e.type !== Strings.events.click) {
      const keyCode = e.keyCode;

      if (!CLOSE_KEYS.includes(keyCode)) {
        return;
      }
    }

    this.props.onClickOrKey();
  }

  render() {
    const { id, className } = this.props;
    const backdropId = !!id ? `${id}-backdrop` : undefined;

    return (
      <div
        id={backdropId}
        className={classNames('backdrop', className)}
        role="button"
        tabIndex={0}
        onClick={this.handleClose}
        onKeyDown={this.handleClose}
      />
    );
  }
}

export default Backdrop;
