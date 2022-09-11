import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import styles from './styles/List';

const List = React.forwardRef(function (
  { className, shouldWrap, columns, children, ...props },
  ref
) {
  const isColumn = !!columns;
  const wrapIt = (isColumn && columns !== 1) || shouldWrap;
  const columnClass = `list--columns_${columns}`;

  return (
    <ul
      ref={ref}
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
});

List.displayName = 'List';
List.propTypes = {
  shouldWrap: PropTypes.bool,
  columns: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default List;
