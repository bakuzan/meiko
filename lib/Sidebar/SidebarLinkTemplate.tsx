import classNames from 'classnames';
import * as React from 'react';

import './Sidebar.scss';

export interface ISidebarLink {
  link: string;
  title: string;
  icon: string;
}
export interface ISidebarLinkProps {
  data: ISidebarLink;
  onClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const SidebarLinkTemplate = ({ data, onClick }: ISidebarLinkProps) => {
  return (
    <a className="primary" href={data.link} onClick={onClick}>
      <div className={classNames('item-icon', 'center-contents')}>
        {data.icon}
      </div>
      <div className={classNames('item-text')}>{data.title}</div>
    </a>
  );
};

export default SidebarLinkTemplate;
