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
): (props: any) => React.ReactElement;

declare const Button: React.SFC<ButtonProps>;

export { withButtonisation, Button };
