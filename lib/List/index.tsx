import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

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

  return (
    <ul
      className={classNames(
        'list',
        {
          'list--column': isColumn,
          [`list--columns_${columns}`]: isColumn,
          'list--wrap': (isColumn && columns !== 1) || shouldWrap
        },
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
