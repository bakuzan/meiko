import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

import { usePrevious } from './hooks/usePrevious';
import styles from './styles/Accordion';

function AccordionToggle({ className, heading, onToggle }) {
  return (
    <button type="button" className={className} onClick={onToggle}>
      {heading}
    </button>
  );
}

function Accordion({
  children,
  className,
  contentProps = {},
  defaultIsCollapsed,
  headingProps = {},
  heading,
  toggleComponent = AccordionToggle,
  onToggle,
  ...pass
}) {
  const [isCollapsed, setCollapsed] = useState(defaultIsCollapsed ?? true);
  const prevCollapsed = usePrevious(isCollapsed);

  const Toggler = toggleComponent;

  useEffect(() => {
    const hasPrev = prevCollapsed !== undefined;
    const hasNew = prevCollapsed !== isCollapsed;

    if (onToggle && hasPrev && hasNew) {
      onToggle(isCollapsed);
    }
  }, [onToggle, isCollapsed, prevCollapsed]);

  return (
    <div
      {...pass}
      className={classNames('accordion', styles.accordion, className)}
    >
      <div
        {...headingProps}
        className={classNames(
          'accordion__heading',
          styles.accordion__heading,
          headingProps.className
        )}
      >
        <Toggler
          className={classNames(
            'accordion__toggle',
            styles.accordion__toggle,
            isCollapsed && [
              'accordion__toggle--checked',
              styles.accordion__toggle_collapsed
            ]
          )}
          heading={heading}
          onToggle={() => setCollapsed((p) => !p)}
        />
      </div>
      <div
        {...contentProps}
        aria-hidden={isCollapsed}
        className={classNames(
          'accordion__content',
          styles.accordion__content,
          contentProps.className,
          isCollapsed && [
            'accordion__content--collapsed',
            styles.accordion__content_collapsed
          ]
        )}
      >
        {typeof children !== 'function' ? children : children(isCollapsed)}
      </div>
    </div>
  );
}

Accordion.propTypes = {
  heading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node
  ]).isRequired,
  defaultIsCollapsed: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node
  ]),
  onToggle: PropTypes.func
};

export default Accordion;
