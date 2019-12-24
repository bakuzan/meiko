export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  btnStyle?: 'primary' | 'accent';
  btnSize?: 'small';
  link?: boolean;
  icon?: string;
}

declare function withButtonisation<TProps>(
  WrappedComponent:
    | React.ComponentClass<TProps & any, any>
    | React.StatelessComponent<TProps & any>
):
  | React.FC<TProps & ButtonProps>
  | React.SFC<TProps & ButtonProps>
  | React.ComponentClass<TProps & ButtonProps>;

declare const Button: React.SFC<ButtonProps>;

export { withButtonisation, Button };
