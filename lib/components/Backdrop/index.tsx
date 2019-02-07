/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { Enums, Strings } from '../../constants';
import styles from './styles';

interface IBackdropProps {
  id?: string;
  onClickOrKey(): void;
}

class Backdrop extends React.Component<IBackdropProps, any> {
  static propTypes = {
    id: PropTypes.string,
    onClickOrKey: PropTypes.func.isRequired
  };

  constructor(props: IBackdropProps) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
  ) {
    const isNotClick = event.type !== Strings.events.click;

    if (isNotClick) {
      const kEvent = event as React.KeyboardEvent<HTMLDivElement>;
      if (!Enums.CLOSE_KEYS.includes(kEvent.keyCode)) {
        return;
      }
    }

    this.props.onClickOrKey();
  }

  render() {
    const { id } = this.props;
    const backdropId = !!id ? `${id}-backdrop` : undefined;

    return (
      <div
        id={backdropId}
        className={classNames('backdrop')}
        css={styles.Backdrop}
        role="button"
        tabIndex={0}
        onClick={this.handleClose}
        onKeyDown={this.handleClose}
      />
    );
  }
}

export default Backdrop;
