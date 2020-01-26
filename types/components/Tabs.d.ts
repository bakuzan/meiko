export interface TabViewProps {
  isActive?: boolean;
  name: string;
  displayName?: string;
  children:
    | ((isActive: boolean) => React.ReactNode)
    | React.ReactNode
    | React.ReactNode[];
}

declare const View: React.SFC<TabViewProps>;

export interface TabContainerProps {
  className?: string;
  panelsClassName?: string;
  activeTab?: string;
  defaultTab?: string;
  children:
    | (boolean | React.ReactElement<TabViewProps>)
    | Array<boolean | React.ReactElement<TabViewProps>>;
  onChange?: (name: string) => void;
}

declare const Container: React.SFC<TabContainerProps>;

export { View, Container };

declare const _exported: {
  View: typeof View;
  Container: typeof Container;
};

export default _exported;
