import * as React from 'react';
import classNames from 'classnames';

import Strings from 'constants/strings';
import './Grid.scss';
import { isString } from 'utils';
import { IJSXChildren } from 'types';

interface IGridProps extends React.HTMLProps<HTMLUListElement> {
  noItemsText?: boolean | string;
  items: any[];
  children(item: any, index: number): IJSXChildren;
}

const Grid = (props: IGridProps): JSX.Element => {
  const { className, items, noItemsText, children, ...other } = props;
  const hasItems = items.length > 0;
  const displayNoItemsText = !!noItemsText;
  const noItemsTextToRender = isString(noItemsText)
    ? noItemsText
    : Strings.noItemsAvailable;

  return (
    <ul className={classNames('mko-grid', className)} {...other}>
      {!hasItems && displayNoItemsText && (
        <li key="NONE">{noItemsTextToRender}</li>
      )}
      {hasItems && props.items.map(children)}
    </ul>
  );
};

Grid.defaultProps = {
  noItemsText: true
};

export default Grid;
