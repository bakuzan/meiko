import * as PropTypes from 'prop-types';
import * as React from 'react';

import Urls from './_constants/urls';

const Image = (props) => (
  <img
    alt=""
    onError={(e: any) => {
      e.target.onerror = null;
      e.target.src = Urls.images.deadImage;
    }}
    {...props}
  />
);

Image.propTypes = {
  alt: PropTypes.string.isRequired
};

export default Image;
