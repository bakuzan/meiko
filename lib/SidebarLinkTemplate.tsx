import classNames from 'classnames';
import * as React from 'react';

import styles from './_styles/Sidebar';

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
    <a className="sidebar-link" href={data.link} onClick={onClick}>
      <div
        className={classNames('sidebar-link__icon', styles.sidebarLink__icon)}
      >
        {data.icon}
      </div>
      <div
        className={classNames('sidebar-link__text', styles.sidebarLink__text)}
      >
        {data.title}
      </div>
    </a>
  );
};

export default SidebarLinkTemplate;
