import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React from 'react';

import { Button } from 'components/Button/Button';
import Icons from 'constants/icons';
import style from './TagChip.scss';

const cx = classNames.bind(style);

const getPropsForClickabilityState = (func, data) => {
  if (!func) return {};
  return {
    role: 'button',
    tabIndex: '0',
    onClick: () => func(data)
  };
};

const TagChip = ({ className, isActive, data, onRemove, onClick }) => {
  const hasRemoveFunc = !!onRemove;
  const hasClick = !!onClick;
  const tagAccessiblityIfClickable = getPropsForClickabilityState(
    onClick,
    data
  );
  return (
    <span
      className={cx('input-chip', className, {
        'input-chip-clickable': hasClick,
        'input-chip-deletable': hasRemoveFunc,
        active: isActive
      })}
      {...tagAccessiblityIfClickable}
    >
      <span className={cx('input-chip-text')}>{data.name}</span>
      {hasRemoveFunc && (
        <Button
          className={cx('input-chip-delete')}
          btnSize="small"
          title="remove"
          icon={Icons.cross}
          onClick={() => onRemove(data)}
        />
      )}
    </span>
  );
};

TagChip.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    count: PropTypes.number
  }).isRequired,
  onRemove: PropTypes.func,
  onClick: PropTypes.func
};

export default TagChip;
