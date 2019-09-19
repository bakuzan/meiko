export interface ListProps extends React.HTMLProps<HTMLUListElement> {
  shouldWrap?: boolean;
  columns?: number;
}

declare const List: React.SFC<ListProps>;

export default List;
