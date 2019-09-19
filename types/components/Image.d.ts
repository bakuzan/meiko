export interface ImageProps extends React.HTMLProps<HTMLImageElement> {
  isLazy?: boolean;
  intersectionMargin?: string;
}

declare const Image: React.SFC<ImageProps>;

export default Image;
