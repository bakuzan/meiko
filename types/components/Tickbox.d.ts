export interface TickboxProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  checked?: boolean;
  text?: string;
}

declare const Tickbox: React.SFC<TickboxProps>;

export default Tickbox;
