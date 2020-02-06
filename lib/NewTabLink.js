import PropTypes from 'prop-types';
import React from 'react';

const NewTabLink = ({ children, ...props }) => (
  <a {...props} target="_blank" rel="nofollow noopener noreferrer">
    {children}
  </a>
);

NewTabLink.displayName = 'NewTabLink';
NewTabLink.propTypes = {
  href: PropTypes.string.isRequired
};
export default NewTabLink;
