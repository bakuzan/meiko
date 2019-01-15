import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Button } from '../../Button';
import TabView from '../TabView';
import { IJSXChildren } from 'types';
import './TabContainer.scss';

interface ITabContainerProps {
  className?: string;
  tabsClassName?: string;
  children: IJSXChildren;
  onChange?(tabName: string): void;
}
interface ITabContainerState {
  activeTab: string;
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

class TabContainer extends React.Component<
  ITabContainerProps,
  ITabContainerState
> {
  static propTypes = {
    className: PropTypes.string,
    tabsClassName: PropTypes.string,
    children: PropTypes.arrayOf(ValidateChildPropType as any).isRequired,
    onChange: PropTypes.func
  };

  constructor(props: ITabContainerProps) {
    super(props);
    this.state = {
      activeTab: null
    };
  }

  componentDidMount() {
    if (this.state.activeTab || !this.props.children) {
      return;
    }

    const child = this.props.children[0].props || { name: 'NONE' };
    this.handleTabChange(child.name);
  }

  handleTabChange(tabName) {
    const { onChange } = this.props;
    this.setState(
      { activeTab: tabName },
      () => onChange && onChange(this.state.activeTab)
    );
  }

  renderViews(tabs) {
    return tabs
      .filter((t) => !!t)
      .map((item) => {
        const { name } = item.props;
        const props = {
          ...item.props,
          isActive: name === this.state.activeTab
        };

        return <TabView key={name} {...props} />;
      });
  }

  renderControls(tabs) {
    return tabs
      .filter((t) => !!t)
      .map((item) => {
        const { name, displayName } = item.props;
        const isActive = name === this.state.activeTab;
        return (
          <li
            key={name}
            className={classNames({ active: isActive })}
            role="tab"
          >
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
      <div className={classNames('tab-container', this.props.className)}>
        <ul className={classNames('tab-controls', 'row')} role="tablist">
          {tabControls}
        </ul>
        <div className={classNames('tabs', this.props.tabsClassName)}>
          {tabViews}
        </div>
      </div>
    );
  }
}

export default TabContainer;
