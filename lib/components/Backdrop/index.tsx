import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { Enums, Strings } from '../../constants';
import styled from 'styles';
import { zIndexes } from 'styles/variables';

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

export default styled(Backdrop)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${zIndexes.get('above-siblings')};
`;
