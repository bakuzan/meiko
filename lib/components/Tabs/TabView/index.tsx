import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import './TabView.scss';

type ChildrenRenderProps = (isActive: boolean) => JSX.Element;

interface ITabViewProps {
  name: string;
  displayName?: string;
  isActive: boolean;
  children: JSX.Element | ChildrenRenderProps;
}

const TabView = ({ isActive, children }: ITabViewProps) => {
  const isFunctionChildren = typeof children === 'function';
  let renderer: ChildrenRenderProps;
  if (isFunctionChildren) {
    renderer = children as ChildrenRenderProps;
  }

  return (
    <div
      className={classNames('tab-view', { active: isActive })}
      role="tabpanel"
    >
      {isFunctionChildren ? renderer(isActive) : children}
    </div>
  );
};

TabView.defaultProps = {
  isActive: false
};

TabView.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func
  ]).isRequired
};

export default TabView;
