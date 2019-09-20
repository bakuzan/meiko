import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';

import Urls from './constants/urls';
import { useIntersect } from './hooks/useIntersect';

function Image({ isLazy, src, intersectionMargin, ...props }) {
  const img = useRef();
  const isIntersecting = useIntersect(img, intersectionMargin);
  const [imgSrc, setSource] = useState(isLazy ? null : src);

  const hasNotErrored = imgSrc !== Urls.images.deadImage;
  const onError = hasNotErrored ? () => setSource(Urls.images.deadImage) : null;

  useEffect(() => {
    const isNewSource = imgSrc !== src && hasNotErrored;
    if (!isLazy) {
      return;
    }

    if (isIntersecting && isNewSource) {
      // Set image source
      setSource(src);
    }
  }, [imgSrc, src, isLazy, isIntersecting, hasNotErrored]);

  return <img ref={img} alt="" onError={onError} src={imgSrc} {...props} />;
}

Image.displayName = 'Image';
Image.defaultProps = {
  isLazy: false
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  isLazy: PropTypes.bool,
  intersectionMargin: PropTypes.string
};

export default Image;
