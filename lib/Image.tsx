import * as PropTypes from 'prop-types';
import * as React from 'react';

import { useIntersect } from './_hooks/useIntersect';
import Urls from './_constants/urls';

interface IImageProps extends React.HTMLProps<HTMLImageElement> {
  isLazy?: boolean;
}

function Image({ isLazy, src, ...props }: IImageProps) {
  const imgSrc = React.useRef<string>();
  const img = React.useRef<HTMLImageElement>();
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
      onError={(e: any) => {
        e.target.onerror = null;
        e.target.src = Urls.images.deadImage;
      }}
      src={imgSrc.current}
      {...props}
    />
  );
}

Image.defaultProps = {
  isLazy: false
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  isLazy: PropTypes.bool
};

export default Image;
