import classNames from 'classnames';
import React from 'react';
import { debounce, getTimeoutSeconds } from './_utils';
import toaster from './_utils/toasterService';

import styles from './_styles/Toaster';

class Toaster extends React.Component {
  constructor(props) {
    super(props);
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
      <div className={classNames('toaster', styles.toaster)}>
        {list.map((item) => {
          const removeToast = () => this.removeToast(item.time);
          const type = item.type.toLowerCase();
          const typeClass = `toast--${type}`;

          return (
            <span
              key={item.time}
              role="button"
              tabIndex={0}
              className={classNames(
                'toast',
                typeClass,
                styles.toast,
                styles[typeClass]
              )}
              onClick={removeToast}
              onKeyDown={removeToast}
            >
              <span className={classNames('toast__title', styles.toast__title)}>
                {item.title}
              </span>
              <span className={classNames('toast__message')}>
                {item.message}
              </span>
            </span>
          );
        })}
      </div>
    );
  }
}

Toaster.displayName = 'Toaster';
export default Toaster;
