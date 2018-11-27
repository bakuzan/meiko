import classNames from 'classnames/bind';
import React from 'react';

import { Button } from 'components/Button';
import Icons from 'constants/icons';
import styles from './Alert.scss';

const cx = classNames.bind(styles);

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
  <div className={cx('alert', type, className)}>
    <div className={cx('alert-content', { 'is-expanded': isExpanded })}>
      <div className={cx('alert-top-content')}>
        <div className={cx('alert-icon')} />
        <div className={cx('alert-title')}>{message}</div>
        <div className="button-group">
          {detail &&
            !isExpanded && (
              <Button onClick={() => expandDetail(id)}>Details</Button>
            )}
          <Button
            className={cx('close')}
            icon={Icons.cross}
            onClick={() => remove(id)}
          />
        </div>
      </div>
      <div className={cx('alert-details')}>{detail}</div>
    </div>
  </div>
);

class Alert extends React.Component {
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
    if (!alerts.length) return null;
    return (
      <div id={id} className={cx('alert-container')}>
        {alerts
          .slice(0, 1)
          .map((a) => (
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
