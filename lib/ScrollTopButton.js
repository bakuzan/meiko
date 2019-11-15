import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { useScrollPosition } from './hooks/useScrollPosition';

import styles from './styles/ScrollTopButton';

const ScrollTopButton = React.memo(({ offset }) => {
  const yOffset = useScrollPosition();
  const showButton = yOffset > offset;

  if (!showButton) {
    return null;
  }

  return (
    <button
      type="button"
      className={classNames('scroll-top', 'ripple', styles.scrollTop)}
      aria-label="Click to scroll to the top of the page"
      title="Scroll to the top"
      onClick={() => window.scrollTo(0, 0)}
    ></button>
  );
});

ScrollTopButton.defaultProps = {
  offset: 0
};

ScrollTopButton.propTypes = {
  offset: PropTypes.number
};

export default ScrollTopButton;
