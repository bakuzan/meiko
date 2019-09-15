import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import Strings from './constants/strings';
import { isString } from './utils';

import styles from './styles/Grid';

const Grid = (props) => {
  const {
    className,
    items,
    noItemsText,
    children,
    uniformRows,
    footerChildren,
    ...other
  } = props;
  const passedNothing = !items;
  const hasItems = !passedNothing && items.length > 0;
  const displayNoItemsText = !!noItemsText;
  const noItemsTextToRender = isString(noItemsText)
    ? noItemsText
    : Strings.noItemsAvailable;

  return (
    <ul
      className={classNames('mko-grid', [
        styles.grid,
        uniformRows && styles.grid_uniformRows,
        className
      ])}
      {...other}
    >
      {!passedNothing && !hasItems && displayNoItemsText && (
        <li
          key="NONE"
          className={classNames('mko-grid__no-items', styles.grid__noItems)}
        >
          {noItemsTextToRender}
        </li>
      )}
      {hasItems && children && props.items.map(children)}
      {footerChildren}
    </ul>
  );
};

Grid.displayName = 'Grid';
Grid.defaultProps = {
  noItemsText: true,
  uniformRows: false,
  footerChildren: null
};

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  noItemsText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.func,
  uniformRows: PropTypes.bool,
  footerChildren: PropTypes.oneOfType([PropTypes.node, PropTypes.element])
};

export default Grid;
