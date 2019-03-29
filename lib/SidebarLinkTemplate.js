import PropTypes from 'prop-types';
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

SidebarLinkTemplate.displayName = 'SidebarLinkTemplate';
SidebarLinkTemplate.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func
};

export default SidebarLinkTemplate;
