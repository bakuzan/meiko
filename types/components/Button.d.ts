export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  btnStyle?: 'primary' | 'accent';
  btnSize?: 'small';
  link?: boolean;
  icon?: string;
}

declare function withButtonisation(
  WrappedComponent: React.Component<ButtonProps, any>
): (props: any) => React.Component<any, any>;

declare function Button(props: ButtonProps): React.Component<ButtonProps, any>;

export { withButtonisation, Button };
