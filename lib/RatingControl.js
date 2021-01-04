import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { OPEN_KEYS } from './constants/enums';
import styles from './styles/RatingControl';

function ratingColouriser(value) {
  if (value < 4) {
    return 'low';
  } else if (value < 7) {
    return 'average';
  } else if (value < 9) {
    return 'good';
  } else {
    return 'great';
  }
}

function RatingControl({
  containerClassName,
  label,
  maxRating,
  value: activeValue,
  ...props
}) {
  const iterator = Array(maxRating).fill(null);
  const isReadOnly = !props.onChange;

  function handleChange(event) {
    if (!props.onChange) {
      return;
    }

    const { type: eventType, target, key } = event;

    if (eventType !== 'click' && !OPEN_KEYS.includes(key)) {
      return;
    }

    if (OPEN_KEYS.includes(key)) {
      event.preventDefault();
    }

    const { value: valueString, type } = target;
    const value = Number(valueString);
    props.onChange({
      target: {
        type,
        value: activeValue === value ? 0 : value,
        name: props.name
      }
    });
  }

  return (
    <div
      className={classNames(
        'rating-control',
        {
          'rating-control--read-only': isReadOnly
        },
        styles.control,
        isReadOnly && styles.control_readOnly,
        containerClassName
      )}
      role="radiogroup"
    >
      {iterator.map((_, index) => {
        const value = index + 1;
        const colourise = ratingColouriser(value);

        const radioId = `${props.id}-${value}`;
        const isSelected = activeValue === value;
        const isPast = activeValue > value;
        const hoverInfo = `${value}/${maxRating}${
          isSelected ? ' (selected)' : ''
        }`;

        return (
          <label
            key={index}
            htmlFor={radioId}
            className={classNames(
              'rating-control__option',
              [`rating-control__option--${colourise}`],
              {
                'rating-control__option--past': isPast,
                'rating-control__option--selected': isSelected
              },
              styles.control__option,
              styles[colourise],
              isPast && styles.control__option_past,
              isSelected && styles.control__option_selected
            )}
            title={hoverInfo}
            aria-label={hoverInfo}
          >
            <input
              type="radio"
              id={radioId}
              className={classNames(
                'rating-control__input',
                styles.control__input,
                (isPast || isSelected) && styles.control__input_highlighted
              )}
              value={value}
              checked={isSelected}
              onChange={() => null}
              onClick={handleChange}
              onKeyDown={handleChange}
            />
          </label>
        );
      })}
      <div
        className={classNames('rating-control__label', styles.control__label)}
      >
        {label}
      </div>
    </div>
  );
}

RatingControl.displayName = 'RatingControl';
RatingControl.defaultProps = {
  maxRating: 10
};

RatingControl.propTypes = {
  containerClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func,
  maxRating: PropTypes.number
};

export default RatingControl;
