export interface GridProps extends React.HTMLProps<HTMLUListElement> {
  items?: any[];
  noItemsText?: string | boolean;
  children?: () => React.ReactNode;
  uniformRows?: boolean;
  footerChildren?: React.ReactNode;
}

declare const Grid: React.SFC<GridProps>;

export default Grid;
