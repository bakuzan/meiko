import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

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

Grid.displayName = 'Grid';
Grid.defaultProps = {
  noItemsText: true
};

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  noItemsText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default Grid;
