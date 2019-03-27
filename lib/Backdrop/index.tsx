import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { Enums, Strings } from '../_constants';
import { createListeners } from '../_utils';
import './Backdrop.scss';

interface IBackdropProps {
  id?: string;
  className?: string;
  onClickOrKey(): void;
}

class Backdrop extends React.Component<IBackdropProps, any> {
  static propTypes = {
    id: PropTypes.string,
    onClickOrKey: PropTypes.func.isRequired
  };
  private listeners = null;

  constructor(props: IBackdropProps) {
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

  handleGlobalClose(e: any) {
    const keyCode = (e as KeyboardEvent).keyCode;
    if (keyCode === Enums.KeyCodes.escape) {
      this.props.onClickOrKey();
    }
  }

  handleClose(
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) {
    if (e.type !== Strings.events.click) {
      const keyCode = (e as React.KeyboardEvent<HTMLDivElement>).keyCode;

      if (!Enums.CLOSE_KEYS.includes(keyCode)) {
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
