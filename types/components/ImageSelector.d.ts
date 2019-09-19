interface ImageSelectorError {
  error: Error;
  message: string;
}

export interface ImageSelectorProps {
  className?: string;
  uploaderClassName?: string;
  name?: string;
  url?: string;
  onChange: (event: Event) => void;
  onError?: (error: ImageSelectorError) => void;
}

declare const ImageSelector: React.SFC<ImageSelectorProps>;

export default ImageSelector;
