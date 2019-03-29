import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Button } from './Button';

import styles from './_styles/Tabs';

export function View({ isActive, children }) {
  const isFunctionChildren = typeof children === 'function';

  return (
    <div
      className={classNames(
        'tab-view',
        {
          'tab-view--active': isActive
        },
        styles.view,
        isActive && styles.view_active
      )}
      role="tabpanel"
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

export function Container({ className, panelsClassName, children, ...props }) {
  const [isFirst, setIsFirstRender] = useState(true);
  const [activeTab, setActiveTab] = useState();
  const tabs = children.filter((x) => !!x);

  React.useEffect(() => {
    if (!isFirst && activeTab) {
      props.onChange(activeTab);
    } else if (isFirst && activeTab) {
      setIsFirstRender(false);
    }

    if (!activeTab) {
      const newTab = children[0].props || { name: 'NONE' };
      setActiveTab(newTab.name);
    }
  }, [activeTab]);

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
                styles.tabControl
              )}
              role="tab"
            >
              <Button onClick={() => setActiveTab(name)}>
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
Container.propTypes = {
  className: PropTypes.string,
  panelsClassName: PropTypes.string,
  children: PropTypes.arrayOf(ValidateChildPropType).isRequired,
  onChange: PropTypes.func
};

const Tabs = { Container, View };
export default Tabs;
