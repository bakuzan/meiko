import * as React from 'react';

import Urls from '../constants/urls';

interface IImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

const Image = (props: IImageProps) => (
  <img
    {...props}
    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const target = e.target as any;
      target.onerror = null;
      target.src = Urls.images.deadImage;
    }}
  />
);

export default Image;
