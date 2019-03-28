import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import styles from './_styles/List';

export interface IListProps extends React.HTMLProps<HTMLUListElement> {
  shouldWrap?: boolean;
  columns?: number;
}

function List({
  className,
  shouldWrap,
  columns,
  children,
  ...props
}: IListProps) {
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

List.propTypes = {
  shouldWrap: PropTypes.bool,
  columns: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.node)
};

export default List;
