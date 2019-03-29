import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import { useIntersect } from './_hooks/useIntersect';
import Urls from './_constants/urls';

function Image({ isLazy, src, ...props }) {
  const imgSrc = useRef();
  const img = useRef();
  const isIntersecting = useIntersect(img);

  React.useEffect(() => {
    const isNewSource = imgSrc.current !== src;
    if ((!isLazy || isIntersecting) && isNewSource) {
      // Set image source
      imgSrc.current = src;
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
      src={imgSrc.current}
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
