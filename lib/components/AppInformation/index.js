import classNames from 'classnames/bind';
import React from 'react';

import Icons from 'constants/icons';
import styles from './AppInformation.scss';

const cx = classNames.bind(styles);

const resolveENVVariable = (str) => (str || '').trim();
const resolveLabel = (b, v) => {
  let label = '';
  if (b) label += `Branch ${b}`;
  if (b && v) label += ', ';
  if (v) label += `Version ${v}`;

  return label;
};

class AppInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };

    this.handleHovered = this.handleHovered.bind(this);
  }

  handleHovered(hovered) {
    return () => this.setState({ hovered });
  }

  render() {
    const { branch, version } = this.props;

    if (!branch && !version) return null;

    const codeBranch = resolveENVVariable(branch);
    const appVersion = resolveENVVariable(version);
    const ariaLabel = resolveLabel(codeBranch, appVersion);

    return (
      <div
        className={cx('app-information')}
        icon={Icons.info}
        onMouseEnter={this.handleHovered(true)}
        onMouseLeave={this.handleHovered(false)}
        aria-label={ariaLabel}
      >
        <div
          className={cx('app-information__detail', {
            'app-information__detail--visible': this.state.hovered
          })}
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
