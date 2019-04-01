import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState } from 'react';

import { Button } from './Button';
import Icons from './constants/icons';

import styles from './styles/Alert';

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
  <div
    className={classNames(
      'alert',
      [`alert--${type}`],
      styles.alert,
      styles[type],
      className
    )}
  >
    <div
      className={classNames(
        'alert__content',
        {
          'alert__content--is-expanded': isExpanded
        },
        styles.alert__content,
        isExpanded && styles.alert__content_expanded
      )}
    >
      <div className={classNames('alert__message', styles.alert__message)}>
        <div className={classNames('alert__icon', styles.alert__icon)} />
        <div className={classNames('alert__title', styles.alert__title)}>
          {message}
        </div>
        <div className={classNames('alert__actions', styles.alert__actions)}>
          {detail && !isExpanded && (
            <Button onClick={() => expandDetail(id)}>Details</Button>
          )}
          <Button
            className={classNames('alert__close', styles.close)}
            aria-label="Close Alert"
            icon={Icons.cross}
            onClick={() => remove(id)}
          />
        </div>
      </div>
      <div className={classNames('alert__details', styles.alert__details)}>
        {detail}
      </div>
    </div>
  </div>
);

function Alert({ alerts, actions, className, messageClassName, ...props }) {
  const [expandedAlerts, setExpanded] = useState([]);

  if (!alerts.length) {
    return null;
  }

  return (
    <div
      className={classNames('alert-container', styles.container, className)}
      {...props}
    >
      {alerts.slice(0, 1).map((a) => (
        <AlertMessage
          key={a.id}
          {...a}
          className={messageClassName}
          isExpanded={expandedAlerts.includes(a.id)}
          expandDetail={(id) => setExpanded((p) => [...p, id])}
          remove={actions.dismissAlertMessage}
        />
      ))}
    </div>
  );
}

Alert.displayName = 'Alert';
Alert.propTypes = {
  messageClassName: PropTypes.string,
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      detail: PropTypes.string
    })
  ),
  actions: PropTypes.shape({
    dismissAlertMessage: PropTypes.func
  })
};

export default Alert;
