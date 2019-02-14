import classNames from 'classnames';
import * as React from 'react';
import { debounce, getTimeoutSeconds } from '../../utils';
import toaster, { IToast } from '../../utils/toaster';
import { ToastContainer, Toast } from './styles';

interface IToasterState {
  stack: IToast[];
}

class Toaster extends React.Component<any, IToasterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      stack: Array(0)
    };

    toaster.register(this);
  }

  removeColdToast() {
    return this.state.stack.filter((x) => x.time > Date.now() - 3000);
  }

  removeToast(time?: number) {
    const warmToast = this.removeColdToast();
    const remainingToast = warmToast.filter((x) => x.time !== time);
    this.setState({ stack: remainingToast });
  }

  eatToast() {
    debounce(() => this.removeToast(), getTimeoutSeconds(3));
  }

  popToast(toast: IToast) {
    this.setState({ stack: [...this.state.stack, toast] });
    this.eatToast();
  }

  render() {
    const list = this.state.stack || Array(0);

    return (
      <ToastContainer className={classNames('toaster')}>
        {list.map((item) => {
          const removeToast = () => this.removeToast(item.time);
          const itemType = item.type.toLowerCase();
          return (
            <Toast
              key={item.time}
              type={itemType}
              role="button"
              tabIndex={0}
              className={classNames('toast', itemType)}
              onClick={removeToast}
              onKeyDown={removeToast}
            >
              <span className={classNames('toast__title')}>{item.title}</span>
              <span className={classNames('toast__message')}>
                {item.message}
              </span>
            </Toast>
          );
        })}
      </ToastContainer>
    );
  }
}

export default Toaster;
