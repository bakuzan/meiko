import { ClearableInputProps } from './ClearableInput';
import { SelectBoxProps } from './SelectBox';

export interface ErrorProps {
  error?: string | { [key: string]: string } | Map<string, string>;
}

declare const _exported: {
  ErrorBlock: React.SFC<React.HTMLProps<HTMLDivElement>>;
  ClearableInput: React.SFC<ClearableInputProps & ErrorProps>;
  SelectBox: React.SFC<SelectBoxProps & ErrorProps>;
};

export default _exported;
