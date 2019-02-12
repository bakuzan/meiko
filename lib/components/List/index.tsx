import styled, { css } from '../../styles';

export interface IListProps {
  columns?: number;
}

const columnMixin = css<IListProps>`
  li {
    flex-basis: ${(props) => 100 / props.columns}%;
  }
`;

const List = styled.ul<IListProps>`
  display: flex;
  padding: 5px;
  margin: 5px 0;
  list-style-type: none;
  ${(props) => props.columns && 'flex-direction: column;'}
  ${(props) => props.columns && props.columns !== 1 && 'flex-flow: wrap;'}
    ${(props) => (props.columns ? columnMixin : '')}

  .formatting-container {
    display: flex;
    width: 100%;
  }

  .list-item-actions {
    display: flex;
    align-items: center;
  }
`;

export default List;
