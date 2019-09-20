export interface TabTrapProps {
  isActive: boolean;
  element?: string;
  firstId: string;
  lastId: string;
  children?: React.ReactNode | React.ReactNode[];
  onDeactivate?: () => void;
}

declare const TabTrap: React.SFC<TabTrapProps>;

export default TabTrap;
