import classNames from 'classnames/bind';
import React, { Component } from 'react';
import { debounce, getTimeoutSeconds } from 'utils/common';
import toaster from 'utils/toaster';
import styles from './Toaster.scss';

const cx = classNames.bind(styles);

class Toaster extends Component {
  constructor() {
    super();
    this.state = {
      stack: Array(0)
    };

    toaster.register(this);
  }

  removeColdToast() {
    return this.state.stack.filter((x) => x.time > Date.now() - 3000);
  }

  removeToast(time) {
    const warmToast = this.removeColdToast();
    const remainingToast = warmToast.filter((x) => x.time !== time);
    this.setState({ stack: remainingToast });
  }

  eatToast() {
    debounce(() => this.removeToast(), getTimeoutSeconds(3));
  }

  popToast(toast) {
    this.setState({ stack: [...this.state.stack, toast] });
    this.eatToast();
  }

  render() {
    const list = this.state.stack || Array(0);

    return (
      <div className={cx('toaster')}>
        {list.map((item) => {
          const removeToast = () => this.removeToast(item.time);
          return (
            <span
              key={item.time}
              role="button"
              tabIndex="0"
              className={cx('toast', item.type.toLowerCase())}
              onClick={removeToast}
              onKeyDown={removeToast}
            >
              <span className={cx('title')}>{item.title}</span>
              <span className={cx('message')}>{item.message}</span>
            </span>
          );
        })}
      </div>
    );
  }
}

export default Toaster;
