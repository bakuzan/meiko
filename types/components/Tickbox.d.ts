export interface TickboxProps extends React.HTMLProps<HTMLInputElement> {
  containerClassName?: string;
  id: string;
  checked?: boolean;
  text?: string;
}

declare const Tickbox: React.SFC<TickboxProps>;

export default Tickbox;
