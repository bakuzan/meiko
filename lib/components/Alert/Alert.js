import classNames from 'classnames';
import React from 'react';

import Icons from 'constants/icons';
import styles from './Alert.scss';
console.log(styles)
const AlertMessage = ({
  id,
  type,
  message,
  detail,
  expandDetail,
  remove,
  isExpanded
}) => (
  <div className={classNames(styles.alert, styles[type])}>
    <div className={classNames(styles.alert_content, { [styles.is_expanded]: isExpanded })}>
      <div className={classNames(styles.alert_top_content)}>
        <div className={classNames(styles.alert_icon)} />
        <div className={classNames(styles.alert_title)}>{message}</div>
        <div className="button-group">
          {detail &&
            !isExpanded && (
              <button
                type="button"
                className="button"
                onClick={() => expandDetail(id)}
              >
                Details
              </button>
            )}
          <button
            type="button"
            className="button-icon"
            icon={Icons.cross}
            onClick={() => remove(id)}
          />
        </div>
      </div>
      <div className={classNames(styles.alert_details)}>{detail}</div>
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
    const { alerts, actions } = this.props;
    if (!alerts.length) return null;
    return (
      <div id="alert-container">
        {alerts
          .slice(0, 1)
          .map(a => (
            <AlertMessage
              key={a.id}
              {...a}
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
