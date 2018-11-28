import classNames from 'classnames';
import React from 'react';

import './Sidebar.scss';

const SidebarLinkTemplate = ({ data, onClick }) => {
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
