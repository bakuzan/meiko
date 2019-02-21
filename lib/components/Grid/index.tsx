import * as React from 'react';
import classNames from 'classnames';

import Strings from '../../constants/strings';
import { isString } from '../../utils';
import { IJSXChildren } from '../../types';
import styled, { css } from '../../styles';
import { media } from '../../styles/variables';

export interface IGridProps extends React.HTMLProps<HTMLUListElement> {
  gridColumns?: Map<string, number>;
  noItemsText?: boolean | string;
  items: any[];
  children(item: any, index: number): IJSXChildren;
}

const StyledGrid = styled.ul`
  display: grid;
  padding: 5px;
  margin: 5px 0;
  list-style-type: none;
  ${(props: IGridProps) => {
    if (!props.gridColumns) {
      return '';
    }
    const gc = props.gridColumns;

    return `
    ${media.get('xs')`grid-template-columns: repeat(auto-fit, ${gc.get(
      'xs'
    )}%);`}
    ${media.get('sm')`grid-template-columns: repeat(auto-fit, ${gc.get(
      'sm'
    )}%);`}
    ${media.get('md')`grid-template-columns: repeat(auto-fit, ${gc.get(
      'md'
    )}%);`}
    ${media.get('lg')`grid-template-columns: repeat(auto-fit, ${gc.get(
      'lg'
    )}%);`}
    `;
  }}
`;

const Grid = (props: IGridProps): JSX.Element => {
  const { className, items, noItemsText, children, ...other } = props;
  const passedNothing = !items;
  const hasItems = !passedNothing && items.length > 0;
  const displayNoItemsText = !!noItemsText;
  const noItemsTextToRender = isString(noItemsText)
    ? noItemsText
    : Strings.noItemsAvailable;

  return (
    <StyledGrid className={classNames('mko-grid', className)} {...other as any}>
      {!passedNothing && !hasItems && displayNoItemsText && (
        <li key="NONE">{noItemsTextToRender}</li>
      )}
      {hasItems && props.items.map(children)}
    </StyledGrid>
  );
};

Grid.defaultProps = {
  noItemsText: true
};

export default Grid;
