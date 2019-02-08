import classNames from 'classnames';
import * as React from 'react';

import { Button, ButtonGroup } from '../Button';
import Icons from '../../constants/icons';
import styled from 'styles';
import { zIndexes } from 'styles/variables';

interface IAlert {
  id: string;
  type: string;
  message: string;
  detail: string;
}

interface IAlertMessageProps {
  className: string;
  id: string | number;
  type: string;
  message: string;
  detail: string;
  isExpanded: boolean;
  remove(id: string | number): void;
  expandDetail(id: string | number): void;
}

const alertContainerHeight = '40px';
const alertIconWidth = alertContainerHeight;
const fontSize = '1em';

const StyledAlert = styled.div`
  width: 100%;
  background-color: #fff;
  color: #000;
  padding: 0;
  border-radius: inherit;
  margin: 0;
  box-shadow: 1px 1px 10px 1px;
  z-index: ${zIndexes.get('above-siblings')};

  .button-group {
    padding: 2px;
    margin: 0;
    button {
      min-width: auto;
    }
  }

  .close::before {
    font-size: 1rem;
  }
`;

const StyledAlertContent = styled.div`
  display: flex;
  flex-direction: column;
  height: ${alertContainerHeight};

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${alertIconWidth};
    height: ${alertIconWidth};
    color: #fff;
    padding: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }

  &__title {
    display: flex;
    flex: 1;
    margin-left: 10px;
    font-size: ${fontSize};
  }

  &__details {
    display: none;
    padding: 10px 0 {
      left: 5px;
    }
    margin-left: ${alertIconWidth};
    white-space: pre-line;
    word-wrap: break-word;
  }

  &--is-expanded {
    height: auto;
    .alert-details {
      display: flex;
      width: auto;
      overflow: hidden;
    }
  }
`;

const AlertMessage = ({
  id,
  type,
  message,
  detail,
  expandDetail,
  remove,
  isExpanded,
  className
}: IAlertMessageProps) => (
  <StyledAlert className={classNames('alert', type, className)}>
    <StyledAlertContent
      className={classNames('alert-content', {
        'alert-content--is-expanded': isExpanded
      })}
    >
      <div className={classNames('alert-content__top')}>
        <div className={classNames('alert-content__icon')} />
        <div className={classNames('alert-content__title')}>{message}</div>
        <ButtonGroup>
          {detail && !isExpanded && (
            <Button onClick={() => expandDetail(id)}>Details</Button>
          )}
          <Button
            className={classNames('close')}
            aria-label="Close Alert"
            icon={Icons.cross}
            onClick={() => remove(id)}
          />
        </ButtonGroup>
      </div>
      <div className={classNames('alert-content__details')}>{detail}</div>
    </StyledAlertContent>
  </StyledAlert>
);

interface IAlertProps {
  id?: string;
  alerts: IAlert[];
  actions: {
    dismissAlertMessage(): void;
  };
  messageClassName?: string;
}
interface IAlertState {
  expandedAlerts: Array<string | number>;
}

const StyledContainer = styled.div`
  position: relative;
  top: 50px;
  left: 50%;
  width: 50%;
  height: ${alertContainerHeight};
  transform: translateX(-50%);
  z-index: ${zIndexes.get('alert')};
`;

class Alert extends React.Component<IAlertProps, IAlertState> {
  constructor(props: IAlertProps) {
    super(props);
    this.state = {
      expandedAlerts: []
    };

    this.handleShowDetail = this.handleShowDetail.bind(this);
  }

  handleShowDetail(alertId: string | number) {
    this.setState({ expandedAlerts: [alertId] });
  }

  render() {
    const { id, alerts, actions, messageClassName } = this.props;

    if (!alerts.length) {
      return null;
    }

    return (
      <StyledContainer id={id} className={classNames('alert-container')}>
        {alerts.slice(0, 1).map((a) => (
          <AlertMessage
            key={a.id}
            {...a}
            className={messageClassName}
            isExpanded={this.state.expandedAlerts.includes(a.id)}
            expandDetail={this.handleShowDetail}
            remove={actions.dismissAlertMessage}
          />
        ))}
      </StyledContainer>
    );
  }
}

export default Alert;
