export interface ListProps extends React.HTMLProps<HTMLUListElement> {
  shouldWrap?: boolean;
  columns?: number;
}

declare const List: React.RefForwardingComponent<HTMLUListElement, ListProps>;

export default List;
