export interface HeaderProps extends React.HTMLProps<HTMLElement> {
  title?: string;
  leftAlignTitle?: boolean;
  navLeft?: React.ReactNode | React.ReactNode[];
  navRight?: React.ReactNode | React.ReactNode[];
}

declare const Header: React.SFC<HeaderProps>;

export default Header;
