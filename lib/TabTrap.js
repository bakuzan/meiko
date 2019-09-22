import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

import { usePrevious } from './hooks/usePrevious';
import styles from './styles/TabTrap';

const TabTrap = React.forwardRef(function TabTrap(
  { isActive, firstId, lastId, element, onDeactivate, children, ...passProps },
  ref
) {
  const Container = element;
  const prevActive = usePrevious(isActive);
  const internalRef = useRef();

  useEffect(() => {
    if (isActive) {
      requestAnimationFrame(() => {
        const target = internalRef.current.querySelector(`#${firstId}`);
        if (target) {
          target.focus();
        }
      });
    } else if (prevActive && onDeactivate) {
      onDeactivate();
    }
  }, [internalRef, isActive, prevActive, firstId, onDeactivate]);

  function focusCycler(e) {
    e.persist();

    const prev = e.relatedTarget;
    const isPrevATrap = prev && prev.className.includes('tab-trap');
    const isCurrTopTrap = e.target.className.includes('tab-trap--top');

    if (isPrevATrap) {
      const targetId = isCurrTopTrap ? firstId : lastId;
      const targetElement = internalRef.current.querySelector(`#${targetId}`);
      targetElement.focus();
      return;
    }

    const nextTrapClass = isCurrTopTrap
      ? '.tab-trap--bottom'
      : '.tab-trap--top';

    const nextTrap = internalRef.current.querySelector(nextTrapClass);
    if (nextTrap === document.activeElement) {
      const targetElement = internalRef.current.querySelector(`#${firstId}`);
      targetElement.focus();
      return;
    }

    nextTrap.focus();
  }

  return (
    <Container
      ref={(elementRef) => {
        internalRef.current = elementRef;
        ref.hasOwnProperty('current')
          ? (ref.current = elementRef)
          : ref(elementRef);
      }}
      {...passProps}
    >
      <input
        type="text"
        className={classNames('tab-trap tab-trap--top', styles.tabTrap)}
        onFocus={focusCycler}
      />
      {children}
      <input
        type="text"
        className={classNames('tab-trap tab-trap--bottom', styles.tabTrap)}
        onFocus={focusCycler}
      />
    </Container>
  );
});

TabTrap.defaultProps = {
  element: 'div'
};

TabTrap.propTypes = {
  isActive: PropTypes.bool.isRequired,
  element: PropTypes.string,
  firstId: PropTypes.string.isRequired,
  lastId: PropTypes.string.isRequired,
  onDeactivate: PropTypes.func
};

export default TabTrap;
