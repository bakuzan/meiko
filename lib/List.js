import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import styles from './_styles/List';

function List({ className, shouldWrap, columns, children, ...props }) {
  const isColumn = !!columns;
  const wrapIt = (isColumn && columns !== 1) || shouldWrap;
  const columnClass = `list--columns_${columns}`;

  return (
    <ul
      className={classNames(
        'list',
        {
          'list--column': isColumn,
          [columnClass]: isColumn,
          'list--wrap': wrapIt
        },
        styles.list,
        isColumn && styles.list_column,
        isColumn && styles[columnClass],
        wrapIt && styles.list_wrap,
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

List.displayName = 'List';
List.propTypes = {
  shouldWrap: PropTypes.bool,
  columns: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.node)
};

export default List;
