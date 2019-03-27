import classNames from 'classnames';
import * as React from 'react';

import { Button } from '../Button';
import Icons from '../_constants/icons';
import './Alert.scss';

interface IAlert {
  id: string;
  type: string;
  message: string;
  detail: string;
}
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

const AlertMessage = ({
  id,
  type,
  message,
  detail,
  expandDetail,
  remove,
  isExpanded,
  className
}) => (
  <div className={classNames('alert', type, className)}>
    <div className={classNames('alert-content', { 'is-expanded': isExpanded })}>
      <div className={classNames('alert-top-content')}>
        <div className={classNames('alert-icon')} />
        <div className={classNames('alert-title')}>{message}</div>
        <div className="button-group">
          {detail && !isExpanded && (
            <Button onClick={() => expandDetail(id)}>Details</Button>
          )}
          <Button
            className={classNames('close')}
            aria-label="Close Alert"
            icon={Icons.cross}
            onClick={() => remove(id)}
          />
        </div>
      </div>
      <div className={classNames('alert-details')}>{detail}</div>
    </div>
  </div>
);

class Alert extends React.Component<IAlertProps, IAlertState> {
  constructor(props) {
    super(props);
    this.state = {
      expandedAlerts: []
    };

    this.handleShowDetail = this.handleShowDetail.bind(this);
  }

  handleShowDetail(alertId) {
    this.setState({ expandedAlerts: [alertId] });
  }

  render() {
    const { id, alerts, actions, messageClassName } = this.props;

    if (!alerts.length) {
      return null;
    }

    return (
      <div id={id} className={classNames('alert-container')}>
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
      </div>
    );
  }
}

export default Alert;
