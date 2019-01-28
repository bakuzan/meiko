/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import classNames from 'classnames';
import * as React from 'react';

import { Button, ButtonGroup } from '../Button';
import Icons from '../../constants/icons';
import styles from './styles';

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
  <div className={classNames('alert', type, className)} css={styles.Alert}>
    <div
      className={classNames('alert-content', { 'is-expanded': isExpanded })}
      css={[styles.AlertContent, isExpanded && styles.AlertContentExpanded]}
    >
      <div
        className={classNames('alert-top-content')}
        css={styles.AlertTopContent}
      >
        <div
          className={classNames('alert-icon')}
          css={[styles.AlertIcon, styles[type]]}
        />
        <div className={classNames('alert-title')} css={styles.AlertTitle}>
          {message}
        </div>
        <ButtonGroup css={css(styles.ButtonGroup)}>
          {detail && !isExpanded && (
            <Button css={css(styles.Button)} onClick={() => expandDetail(id)}>
              Details
            </Button>
          )}
          <Button
            className={classNames('close')}
            css={[styles.Button, styles.Close]}
            aria-label="Close Alert"
            icon={Icons.cross}
            onClick={() => remove(id)}
          />
        </ButtonGroup>
      </div>
      <div
        className={classNames('alert-details')}
        css={[
          styles.AlertDetails,
          isExpanded && styles.AlertContentExpandedDetails
        ]}
      >
        {detail}
      </div>
    </div>
  </div>
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
      <div
        id={id}
        className={classNames('alert-container')}
        css={styles.AlertContainer}
      >
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
