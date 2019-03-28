import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { Button } from './Button';
import Icons from './_constants/icons';

import styles from './_styles/TagChip';

export interface ITagOption {
  id?: string | number;
  name: string;
  count?: number;
}
interface ITagChipProps {
  className: string;
  isActive: boolean;
  data: ITagOption;
  chipSize?: string | number;
  onRemove?(tag: ITagOption): void;
  onClick?(tag: ITagOption): void;
}

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
      className={classNames(
        'tag-chip',
        {
          'tag-chip--clickable': hasClick,
          'tag-chip--deletable': hasRemoveFunc,
          'tag-chip--active': isActive
        },
        className,
        styles.tagChip,
        hasClick && styles.tagChip_clickable,
        hasRemoveFunc && styles.tagChip_deletable
      )}
      {...tagAccessiblityIfClickable as any}
    >
      <span
        className={classNames('tag-chip__text', styles.tagChip__text)}
        style={chipTextStyle}
      >
        {data.name}
      </span>
      {hasRemoveFunc && (
        <Button
          className={classNames('tag-chip__delete', styles.tagChip__delete)}
          btnSize="small"
          title="remove"
          aria-label="Remove tag"
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
