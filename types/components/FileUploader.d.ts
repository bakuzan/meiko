export interface FileUploaderProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  value?: string;
  placeholder?: string;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

declare const FileUploader: React.SFC<FileUploaderProps>;

export default FileUploader;
