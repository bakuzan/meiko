import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import Icons from './_constants/icons';
import styles from './_styles/AppInformation';

const resolveENVVariable = (str) => (str || '').trim();

function resolveLabel(b, v) {
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
}

function AppInformation({ branch, version }) {
  const [hovered, setHovered] = React.useState(false);

  if (!branch && !version) {
    return null;
  }

  const codeBranch = resolveENVVariable(branch);
  const appVersion = resolveENVVariable(version);
  const ariaLabel = resolveLabel(codeBranch, appVersion);

  return (
    <div
      className={classNames('app-information', styles.appInformation)}
      data-icon={Icons.info}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={ariaLabel}
    >
      <div
        className={classNames(
          'app-information__detail',
          styles.appInformation__detail,
          {
            'app-information__detail--visible': hovered,
            [styles.appInformation__detail_visible]: hovered
          }
        )}
      >
        {codeBranch && <span>Branch: {codeBranch}</span>}
        {!!codeBranch && !!appVersion && <br />}
        {appVersion && <span>Version: {appVersion}</span>}
      </div>
    </div>
  );
}

AppInformation.displayName = 'AppInformation';
AppInformation.propTypes = {
  version: PropTypes.string,
  branch: PropTypes.string
};

export default AppInformation;
