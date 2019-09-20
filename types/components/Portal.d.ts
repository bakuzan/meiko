export interface PortalProps {
  parentTag?: string;
  parentClassName?: string;
  querySelector: string;
  children: React.ReactNode;
}

declare const Portal: React.SFC<PortalProps>;

export default Portal;
