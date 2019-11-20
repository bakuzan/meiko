import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import styles from './styles/Tooltip';

const PLACE_ABOVE = 'above';

function resolvePositioning(tooltip, { at, adjustment }, usePosition, center) {
  const element = tooltip && tooltip.current;

  const startingSpotTop = element
    ? element.offsetTop + element.offsetHeight / 2
    : undefined;

  const startingSpotLeft = element
    ? element.offsetLeft + element.offsetWidth / 4
    : undefined;

  const rect = element
    ? element.getBoundingClientRect()
    : { height: 0, width: 0 };

  let top = at[1] || startingSpotTop;
  top = (usePosition === PLACE_ABOVE ? rect.y - rect.height : top) || undefined;

  let left = at[0] || startingSpotLeft;

  const leftForCenter = adjustment ? left : startingSpotLeft;
  left = (center ? leftForCenter + rect.width / 4 : left) || undefined;

  const transform = adjustment
    ? { transform: `translateX(${adjustment}px)` }
    : {};

  let style = usePosition ? { top, left, bottom: 'unset' } : null;
  style = style ? { ...style, ...transform } : { ...transform };

  return style;
}

function Tooltip({
  className,
  contentId,
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

  // Clear timeout on unmount
  useEffect(() => () => clearTimeout(timer.current), []);

  const style = resolvePositioning(tooltip, other, usePosition, center);

  function handleEnter(e) {
    const { clientX, clientY } = e;
    if (!isEnabled) {
      return;
    }

    let adjustment = null;

    const rect = tooltip.current.getBoundingClientRect();
    const contentWidth = tooltip.current.firstChild.offsetWidth;
    const halfWidth = contentWidth / 2;
    const positionOffset = usePosition ? clientX : rect.left;
    const space = window.innerWidth - positionOffset;

    const tooFarLeft = (center || usePosition) && positionOffset < halfWidth;
    const tooFarRight = space < (center ? halfWidth : contentWidth);

    if (tooFarLeft) {
      const delta = center ? rect.width / 2 : 0;
      adjustment = -rect.left + 10 - delta;
    } else if (tooFarRight) {
      const widthDelta = center ? contentWidth + rect.width / 2 : contentWidth;
      adjustment = -(widthDelta - space) - 10;
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
        id={contentId}
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
  usePosition: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf([PLACE_ABOVE])
  ]),
  delay: PropTypes.number,
  center: PropTypes.bool,
  highlight: PropTypes.bool,
  contentId: PropTypes.string
};

export default Tooltip;
