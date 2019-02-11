import classNames from 'classnames';
import * as React from 'react';

import { Button, ButtonGroup } from '../Button';
import Icons from '../../constants/icons';
import {
  StyledContainer,
  StyledAlert,
  AlertContent,
  AlertContentTop,
  AlertDetails,
  AlertIcon,
  AlertTitle
} from './styles';

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
    <AlertContent
      className={classNames('alert-content', {
        'alert-content--is-expanded': isExpanded
      })}
      isExpanded={isExpanded}
    >
      <AlertContentTop className={classNames('alert-content__top')}>
        <AlertIcon className={classNames('alert-content__icon')} type={type} />
        <AlertTitle className={classNames('alert-content__title')}>
          {message}
        </AlertTitle>
        <ButtonGroup className="alert__button-group">
          {detail && !isExpanded && (
            <Button onClick={() => expandDetail(id)}>Details</Button>
          )}
          <Button
            className={classNames('alert__close')}
            aria-label="Close Alert"
            icon={Icons.cross}
            onClick={() => remove(id)}
          />
        </ButtonGroup>
      </AlertContentTop>
      <AlertDetails className={classNames('alert-content__details')}>
        {detail}
      </AlertDetails>
    </AlertContent>
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
