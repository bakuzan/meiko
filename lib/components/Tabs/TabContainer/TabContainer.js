import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Button } from 'components/Button/Button';
import TabView from '../TabView/TabView';
import styles from './TabContainer.scss';

const cx = classNames.bind(styles);

class TabContainer extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: null
    };
  }
  componentDidMount() {
    if (this.state.activeTab || !this.props.children) return;
    const child = this.props.children[0].props;
    this.setState({ activeTab: child.name });
  }
  handleTabChange(tabName) {
    this.setState({ activeTab: tabName });
  }
  renderViews(tabs) {
    return tabs.map(item => {
      const { name } = item.props;
      const props = Object.assign(
        {},
        { ...item.props, isActive: name === this.state.activeTab }
      );

      return <TabView key={name} {...props} />;
    });
  }
  renderControls(tabs) {
    return tabs.map(item => {
      const { name, displayName } = item.props;
      const isActive = name === this.state.activeTab;
      return (
        <li key={name} className={cx({ active: isActive })} role="tab">
          <Button onClick={() => this.handleTabChange(name)}>
            {displayName || name}
          </Button>
        </li>
      );
    });
  }
  render() {
    const children = this.props.children;
    const tabControls = this.renderControls(children);
    const tabViews = this.renderViews(children);

    return (
      <div className={cx('tab-container', this.props.className)}>
        <ul className={cx('tab-controls', 'row')} role="tablist">
          {tabControls}
        </ul>
        <div className={cx('tabs', this.props.tabsClassName)}>{tabViews}</div>
      </div>
    );
  }
}

TabContainer.propTypes = {
  className: PropTypes.string,
  tabsClassName: PropTypes.string,
  children: PropTypes.arrayOf(function(
    propValue,
    key,
    componentName,
    location,
    propFullName
  ) {
    propValue.forEach(item => {
      if (!item.type || !item.type.name || item.type.name !== 'TabView') {
        return new Error(
          `TabContainer propTypes: Invalid prop '${propFullName}' supplied to ${componentName}. Validation failed.`
        );
      }
    });
  }).isRequired
};

export default TabContainer;
