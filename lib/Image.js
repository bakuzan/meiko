import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';

import Urls from './_constants/urls';
import { useIntersect } from './_hooks/useIntersect';

function Image({ isLazy, src, ...props }) {
  const img = useRef();
  const isIntersecting = useIntersect(img);
  const [imgSrc, setSource] = useState(null);

  useEffect(() => {
    const isNewSource = imgSrc !== src;

    if ((!isLazy || isIntersecting) && isNewSource) {
      // Set image source
      setSource(src);
    }
  }, [src, isIntersecting]);

  return (
    <img
      ref={img}
      alt=""
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = Urls.images.deadImage;
      }}
      src={imgSrc}
      {...props}
    />
  );
}

Image.displayName = 'Image';
Image.defaultProps = {
  isLazy: false
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  isLazy: PropTypes.bool
};

export default Image;
