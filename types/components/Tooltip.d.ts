export type TooltipPosition = 'above';

export interface TooltipProps extends React.HTMLProps<HTMLDivElement> {
  text: string;
  isEnabled?: boolean;
  allowWrapping?: boolean;
  usePosition?: boolean | TooltipPosition;
  delay?: number;
  center?: boolean;
  highlight?: boolean;
  contentId?: string;
  attachTo?: string;
}

declare const Tooltip: React.SFC<TooltipProps>;

export default Tooltip;
