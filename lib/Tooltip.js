import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState, useRef } from 'react';
import styles from './styles/Tooltip';

function resolvePositioning(tooltip, { at, adjustment }, usePosition) {
  const element = tooltip && tooltip.current;

  const startingSpotTop = element
    ? element.offsetTop + element.offsetHeight / 2
    : undefined;

  const startingSpotLeft = element
    ? element.offsetLeft + element.offsetWidth / 4
    : undefined;

  const top = at[1] || startingSpotTop;
  const left = at[0] || startingSpotLeft;

  const transform = adjustment
    ? { transform: `translateX(${adjustment}px)` }
    : {};

  let style = usePosition ? { top, left, bottom: 'unset' } : null;
  style = style ? { ...style, ...transform } : { ...transform };

  return style;
}

function Tooltip({
  className,
  text,
  children,
  allowWrapping,
  usePosition,
  delay,
  center,
  highlight,
  isEnabled,
  ...props
}) {
  const timer = useRef();
  const tooltip = useRef();
  const [{ hovered, ...other }, setHovered] = useState({
    hovered: false,
    at: [],
    adjustment: null
  });

  const style = resolvePositioning(tooltip, other, usePosition);

  function handleEnter(e) {
    const { clientX, clientY } = e;
    if (!isEnabled) {
      return;
    }

    const rect = tooltip.current.getBoundingClientRect();
    const contentWidth = tooltip.current.firstChild.offsetWidth;
    const space = window.innerWidth - (rect.width + rect.left);
    let adjustment = null;

    if (contentWidth > rect.left + rect.width / 2) {
      adjustment = -rect.left;
    } else if (space < contentWidth) {
      adjustment = -(contentWidth - space);
    }

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setHovered({ hovered: true, at: [clientX, clientY], adjustment });
    }, delay);
  }

  function handleLeave() {
    if (!isEnabled) {
      return;
    }

    clearTimeout(timer.current);
    setHovered({ hovered: false, at: [] });
  }

  return (
    <div
      ref={tooltip}
      className={classNames('tooltip', styles.tooltip, className, [
        highlight && hovered && styles.tooltip__highlight
      ])}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...props}
    >
      <div
        style={style}
        aria-hidden={!isEnabled}
        className={classNames('tooltip__content', styles.tooltipContent, [
          hovered && styles.tooltipContent__hovered,
          allowWrapping && styles.tooltipContent__wrap,
          usePosition && styles.tooltipContent__fixed,
          center && styles.tooltipContent__center
        ])}
      >
        {text}
      </div>
      {children}
    </div>
  );
}

Tooltip.displayName = 'Tooltip';
Tooltip.defaultProps = {
  isEnabled: true,
  allowWrapping: false,
  usePosition: false,
  center: false,
  highlight: false,
  delay: 0
};
Tooltip.propTypes = {
  isEnabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  allowWrapping: PropTypes.bool,
  usePosition: PropTypes.bool,
  delay: PropTypes.number,
  center: PropTypes.bool,
  highlight: PropTypes.bool
};

export default Tooltip;
