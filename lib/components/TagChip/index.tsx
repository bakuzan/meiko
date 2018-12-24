import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { Button } from '../Button';
import Icons from '../../constants/icons';
import './TagChip.scss';

const getPropsForClickabilityState = (
  func: (data: ITagOption) => void,
  data: ITagOption
) => {
  if (!func) {
    return {};
  }

  return {
    role: 'button',
    tabIndex: '0',
    onClick: () => func(data)
  };
};

const getChipStyle = (size: string | number) =>
  !size ? {} : { fontSize: `${size}em` };

const TagChip = ({
  className,
  isActive,
  data,
  onRemove,
  onClick,
  chipSize
}: ITagChipProps) => {
  const hasRemoveFunc = !!onRemove;
  const hasClick = !!onClick;
  const tagAccessiblityIfClickable = getPropsForClickabilityState(
    onClick,
    data
  );
  const chipTextStyle = getChipStyle(chipSize);

  return (
    <span
      className={classNames('input-chip', className, {
        'input-chip-clickable': hasClick,
        'input-chip-deletable': hasRemoveFunc,
        active: isActive
      })}
      {...tagAccessiblityIfClickable}
    >
      <span className={classNames('input-chip-text')} style={chipTextStyle}>
        {data.name}
      </span>
      {hasRemoveFunc && (
        <Button
          className={classNames('input-chip-delete')}
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
  onClick: PropTypes.func,
  chipSize: PropTypes.number
};

export default TagChip;
