import PropTypes from 'prop-types';
import React from 'react';

import Urls from 'constants/urls';

const Image = props => (
  <img
    alt=""
    {...props}
    onError={e => {
      e.target.onerror = null;
      e.target.src = Urls.images.deadImage;
    }}
  />
);

Image.propTypes = {
  alt: PropTypes.string.isRequired
};

export default Image;
