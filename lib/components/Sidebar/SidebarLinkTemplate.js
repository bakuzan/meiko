import classNames from 'classnames/bind';
import React from 'react';

import styles from './Sidebar.scss';

const cx = classNames.bind(styles);

const SidebarLinkTemplate = ({ data, onClick }) => {
  return (
    <a className="primary" href={data.link} onClick={onClick}>
      <div className={cx('sidebar-item-icon', 'center-contents')}>
        {data.icon}
      </div>
      <div className={cx('sidebar-item-text')}>{data.title}</div>
    </a>
  );
};

export default SidebarLinkTemplate;
