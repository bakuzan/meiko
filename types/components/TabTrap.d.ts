export interface TabTrapProps extends React.HTMLProps<HTMLElement> {
  isActive: boolean;
  element?: keyof JSX.IntrinsicElements;
  firstId: string;
  lastId: string;
  children?: React.ReactNode | React.ReactNode[];
  onDeactivate?: () => void;
}

declare const TabTrap: React.ForwardRefExoticComponent<TabTrapProps>;

export default TabTrap;
