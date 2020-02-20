import { ButtonProps } from './Button';

declare const Input: React.ForwardRefExoticComponent<React.HTMLProps<
  HTMLInputElement
>>;

export interface ClearableInputProps extends React.HTMLProps<HTMLInputElement> {
  containerClassName?: string;
  label?: string;
  maxNumberText?: (props: ClearableInputProps) => string;
  clearButtonProps?: ButtonProps;
}

declare const ClearableInput: React.ForwardRefExoticComponent<ClearableInputProps>;

export { Input };

export default ClearableInput;
