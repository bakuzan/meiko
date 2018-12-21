interface IBackdropProps {
  id: string;
  onClickOrKey(): void;
}

interface IImageSelectorProps {
  className: string;
  uploaderClassName: string;
  name: string;
  url: string;
  onChange(e: any): void;
  onError(error: IImageUploadError): void;
}
interface IImageSelectorState {
  imageFile: File;
  imageUrl: string;
  imageMessage: string;
}
interface IImageUploadError {
  error: string;
  message: string;
}

interface ITagCloudSelectorProps {
  name: string;
  className: string;
  tagClass: string;
  tagOptions: ITagOption[];
  selectedTags: number[];
  onSelect(tags: any[], name: string): void;
  sizeRelativeToCount: boolean;
}
interface ITagOption {
  count: number;
  name: string;
  id: string | number;
}

interface IToast {
  time?: number;
  type: string;
  title: string;
  message: string;
}
interface IToaster {
  popToast(toast: IToast): void;
}
interface IToasterState {
  stack: IToast[];
}
