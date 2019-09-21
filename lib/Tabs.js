import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Button } from './Button';

import styles from './styles/Tabs';

export function View({ className, isActive, children }) {
  const isFunctionChildren = typeof children === 'function';

  return (
    <div
      className={classNames(
        'tab-view',
        {
          'tab-view--active': isActive
        },
        styles.view,
        isActive && styles.view_active,
        className
      )}
      role="tabpanel"
      aria-hidden={!isActive}
    >
      {isFunctionChildren ? children(isActive) : children}
    </div>
  );
}

View.displayName = 'TabView';
View.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export function Container({
  className,
  panelsClassName,
  children,
  onChange,
  ...props
}) {
  const [isFirst, setIsFirstRender] = useState(true);
  const [currentTab, setCurrentTab] = useState(props.defaultTab);
  const tabs = children.filter((x) => !!x);

  const firstChild = children[0].props;
  const activeTab = props.activeTab || currentTab;

  function onTabChange(name) {
    if (props.activeTab) {
      onChange && onChange(name);
    } else {
      setCurrentTab(name);
    }
  }

  useEffect(() => {
    if (!isFirst && currentTab) {
      onChange && onChange(currentTab);
    } else if (isFirst && currentTab) {
      setIsFirstRender(false);
    }

    if (!activeTab) {
      const newTab = firstChild || { name: 'NONE' };
      setCurrentTab(newTab.name);
    }
  }, [currentTab, activeTab, isFirst, firstChild, onChange]);

  return (
    <div className={classNames('tabs', styles.container, className)}>
      <ul
        className={classNames('tabs__controls', styles.controls)}
        role="tablist"
      >
        {tabs.map((t) => {
          const { name, displayName } = t.props;
          const isActive = name === activeTab;

          return (
            <li
              key={name}
              className={classNames(
                'tab-control',
                {
                  'tab-control--active': isActive
                },
                styles.tabControl,
                isActive && styles.tabControl_active
              )}
              role="tab"
            >
              <Button
                className="tab-control__button"
                onClick={() => onTabChange(name)}
              >
                {displayName || name}
              </Button>
            </li>
          );
        })}
      </ul>
      <div
        className={classNames('tabs__panels', styles.panels, panelsClassName)}
      >
        {tabs.map((t) => {
          const { name } = t.props;
          const isActive = name === activeTab;
          const props = {
            ...t.props,
            isActive
          };

          return <View key={name} {...props} />;
        })}
      </div>
    </div>
  );
}

function ValidateChildPropType(propValue, _, componentName, __, propFullName) {
  propValue.forEach((item) => {
    if (!item.type || !item.type.name || item.type.name !== 'TabView') {
      return new Error(
        `TabContainer propTypes: Invalid prop '${propFullName}' supplied to ${componentName}. Validation failed.`
      );
    }
  });
}

Container.displayName = 'TabContainer';
Container.defaultProps = {
  activeTab: null,
  defaultTab: null
};
Container.propTypes = {
  className: PropTypes.string,
  panelsClassName: PropTypes.string,
  children: PropTypes.arrayOf(ValidateChildPropType).isRequired,
  onChange: PropTypes.func,
  activeTab: PropTypes.string,
  defaultTab: PropTypes.string
};

const Tabs = { Container, View };
export default Tabs;
