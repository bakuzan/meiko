/** @jsx jsx */
import { jsx } from '@emotion/core';
import classNames from 'classnames';
import * as React from 'react';

import Icons from '../../constants/icons';
import styles from './styles';

const resolveENVVariable = (str: string) => (str || '').trim();
const resolveLabel = (b: string, v: string) => {
  let label = '';
  if (b) {
    label += `Branch ${b}`;
  }

  if (b && v) {
    label += ', ';
  }

  if (v) {
    label += `Version ${v}`;
  }

  return label;
};

interface IAppInformationProps {
  branch?: string;
  version?: string;
}
interface IAppInformationState {
  hovered: boolean;
}

class AppInformation extends React.PureComponent<
  IAppInformationProps,
  IAppInformationState
> {
  constructor(props: IAppInformationProps) {
    super(props);
    this.state = {
      hovered: false
    };

    this.handleHovered = this.handleHovered.bind(this);
  }

  handleHovered(hovered: boolean) {
    return () => this.setState({ hovered });
  }

  render() {
    const { branch, version } = this.props;

    if (!branch && !version) {
      return null;
    }

    const codeBranch = resolveENVVariable(branch);
    const appVersion = resolveENVVariable(version);
    const ariaLabel = resolveLabel(codeBranch, appVersion);

    return (
      <div
        className={classNames('app-information')}
        css={styles.AppInformation}
        data-icon={Icons.info}
        onMouseEnter={this.handleHovered(true)}
        onMouseLeave={this.handleHovered(false)}
        aria-label={ariaLabel}
      >
        <div
          className={classNames('app-information__detail', {
            'app-information__detail--visible': this.state.hovered
          })}
          css={[
            styles.AppInformationDetail,
            this.state.hovered && styles.AppInformationDetailVisible
          ]}
        >
          {codeBranch && <span>Branch: {codeBranch}</span>}
          {!!codeBranch && !!appVersion && <br />}
          {appVersion && <span>Version: {appVersion}</span>}
        </div>
      </div>
    );
  }
}

export default AppInformation;
