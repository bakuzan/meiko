import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';

import Portal from './Portal';

import calculateTooltipAdjustment from './utils/tooltip/calculateTooltipAdjustment';
import resolvePositioning, {
  Placement
} from './utils/tooltip/resolvePositioning';
import styles from './styles/Tooltip';

function Tooltip({
  className,
  contentId,
  text,
  children,
  allowWrapping = false,
  usePosition = false,
  delay = 0,
  center = false,
  highlight = false,
  isEnabled = true,
  attachTo,
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

  function handleEnter() {
    if (!isEnabled) {
      return;
    }

    const { adjustment, clientX, clientY } = calculateTooltipAdjustment(
      tooltip.current,
      { usePosition, center }
    );

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setHovered({
        hovered: true,
        at: [clientX, clientY],
        adjustment
      });
    }, delay);
  }

  function handleLeave() {
    if (!isEnabled) {
      return;
    }

    clearTimeout(timer.current);
    setHovered({ hovered: false, at: [], adjustment: null });
  }

  const TooltipContent = ({ hidden, readable }) => (
    <div
      id={(readable && contentId) || undefined}
      style={style}
      aria-hidden={!readable}
      className={classNames(
        'tooltip__content',
        styles.tooltipContent,
        attachTo && styles.tooltipContent__inPortal,
        !hidden && [
          hovered && styles.tooltipContent__hovered,
          allowWrapping && styles.tooltipContent__wrap,
          usePosition && styles.tooltipContent__fixed,
          center && styles.tooltipContent__center
        ]
      )}
    >
      {text}
    </div>
  );

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
      <TooltipContent hidden={!!attachTo} readable={!!isEnabled} />
      {isEnabled && hovered && attachTo && (
        <Portal querySelector={attachTo}>
          <TooltipContent readable={false} />
        </Portal>
      )}
      {children}
    </div>
  );
}

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  isEnabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  allowWrapping: PropTypes.bool,
  usePosition: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf([Placement.Above, Placement.Below])
  ]),
  delay: PropTypes.number,
  center: PropTypes.bool,
  highlight: PropTypes.bool,
  contentId: PropTypes.string,
  attachTo: PropTypes.string
};

export default Tooltip;
