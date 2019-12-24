import { ButtonProps } from './Button';

export interface DropdownMenuProps extends ButtonProps {
  title?: string;
  icon?: string;
  align?: 'left' | 'right' | 'center';
  children?:
    | ((close: () => void) => React.ReactNode)
    | React.ReactNode
    | React.ReactNode[];
}

declare const DropdownMenu: React.SFC<DropdownMenuProps>;

export default DropdownMenu;
