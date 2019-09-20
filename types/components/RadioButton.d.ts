export interface RadioButtonProps extends React.HTMLProps<HTMLInputElement> {
  containerClassName?: string;
  label?: string;
}

declare const RadioButton: React.SFC<RadioButtonProps>;

export default RadioButton;
