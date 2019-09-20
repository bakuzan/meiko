export interface TooltipProps extends React.HTMLProps<HTMLDivElement> {
  text: string;
  isEnabled?: boolean;
  allowWrapping?: boolean;
  usePosition?: boolean;
  delay?: number;
  center?: boolean;
  highlight?: boolean;
}

declare const Tooltip: React.SFC<TooltipProps>;

export default Tooltip;
