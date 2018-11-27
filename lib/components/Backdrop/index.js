import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React from 'react';

import { Enums, Strings } from 'constants/index';
import styles from './Backdrop.scss';

const cx = classNames.bind(styles);

class Backdrop extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e) {
    if (
      e.type !== Strings.events.click &&
      !Enums.CLOSE_KEYS.includes(e.keyCode)
    )
      return;

    this.props.onClickOrKey();
  }

  render() {
    const { id } = this.props;
    const backdropId = !!id ? `${id}-backdrop` : undefined;

    return (
      <div
        id={backdropId}
        className={cx('backdrop')}
        role="button"
        tabIndex="0"
        onClick={this.handleClose}
        onKeyDown={this.handleClose}
      />
    );
  }
}

Backdrop.propTypes = {
  id: PropTypes.string,
  onClickOrKey: PropTypes.func.isRequired
};

export default Backdrop;
