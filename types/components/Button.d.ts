export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  btnStyle?: 'primary' | 'accent';
  btnSize?: 'small';
  link?: boolean;
  icon?: string;
}

declare function withButtonisation<TProps>(
  WrappedComponent:
    | React.ComponentClass<TProps & any, any>
    | React.FunctionComponent<TProps & any>
):
  | React.FunctionComponent<TProps & ButtonProps>
  | React.ComponentClass<TProps & ButtonProps>;

declare const Button: React.ForwardRefExoticComponent<ButtonProps>;

export { withButtonisation, Button };
