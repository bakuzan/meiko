import React from 'react';
import classNames from 'classnames';

import Strings from './_constants/strings';
import { isString } from './_utils';

import styles from './_styles/Grid';

const Grid = (props) => {
  const { className, items, noItemsText, children, ...other } = props;
  const passedNothing = !items;
  const hasItems = !passedNothing && items.length > 0;
  const displayNoItemsText = !!noItemsText;
  const noItemsTextToRender = isString(noItemsText)
    ? noItemsText
    : Strings.noItemsAvailable;

  return (
    <ul className={classNames('mko-grid', styles.grid, className)} {...other}>
      {!passedNothing && !hasItems && displayNoItemsText && (
        <li key="NONE" className="mko-grid__no-items">
          {noItemsTextToRender}
        </li>
      )}
      {hasItems && props.items.map(children)}
    </ul>
  );
};

Grid.defaultProps = {
  noItemsText: true
};

export default Grid;
