import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';

import Urls from './constants/urls';
import { useIntersect } from './hooks/useIntersect';
import { usePrevious } from './hooks/usePrevious';

function Image({ isLazy = false, src, intersectionMargin, ...props }) {
  const img = useRef();
  const isIntersecting = useIntersect(img, intersectionMargin);
  const [imgSrc, setSource] = useState(isLazy ? null : src);
  const prevSrc = usePrevious(src);

  const hasUpdatedSrc =
    src !== prevSrc && ((isLazy && prevSrc && src) || !isLazy);
  const hasNotErrored = imgSrc !== Urls.images.deadImage;
  const onError = hasNotErrored ? () => setSource(Urls.images.deadImage) : null;

  useEffect(() => {
    if (!isLazy && !hasUpdatedSrc) {
      return;
    }

    if ((isIntersecting && hasNotErrored) || hasUpdatedSrc) {
      // Set image source
      setSource(src);
    }
  }, [imgSrc, src, isLazy, isIntersecting, hasUpdatedSrc, hasNotErrored]);

  return (
    <img
      ref={img}
      src={imgSrc || null}
      onError={onError}
      {...props}
      alt={hasNotErrored ? props.alt : `Error placeholder for ${props.alt}`}
    />
  );
}

Image.displayName = 'Image';

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  isLazy: PropTypes.bool,
  intersectionMargin: PropTypes.string
};

export default Image;
