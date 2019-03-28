import classNames from 'classnames';
import React from 'react';

import styles from './_styles/Sidebar';

const SidebarLinkTemplate = ({ data, onClick }) => {
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
