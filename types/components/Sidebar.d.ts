interface SidebarItem {
  title: string;
  link?: string;
  icon?: string;
  [key: string]: any;
}

export interface SidebarProps extends React.HTMLProps<HTMLDivElement> {
  isHidden: boolean;
  isCollapsed: boolean;
  items?: SidebarItem[];
  customLinkTemplate?: React.Component<any, any> | React.SFC<any>;
  toggleCollapse: (event: Event) => void;
  close: (event: Event) => void;
}

declare const Sidebar: React.SFC<SidebarProps>;

export default Sidebar;
