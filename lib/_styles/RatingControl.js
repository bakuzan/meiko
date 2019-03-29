import { sheet } from './nano';
import { ratingColours } from './variables';

const ratingControlSize = '20px';

const filledStar = {
  '& rating-control__input::before': {
    content: '\u2605'
  }
};

export default sheet({
  control: {
    position: 'relative',
    display: 'flex',
    padding: '5px',
    paddingTop: '1em'
  },
  control_readOnly: {
    '& .rating-control--read-only': {
      cursor: 'default'
    }
  },
  control__label: {
    position: 'absolute',
    top: '1px',
    left: '5px',
    fontSize: '0.75em'
  },
  control__option: {
    height: ratingControlSize,
    width: ratingControlSize
  },
  control__input: {
    position: 'relative',
    appearance: 'none',
    height: ratingControlSize,
    width: ratingControlSize,
    margin: 0,
    cursor: 'pointer',
    '&::before': {
      content: '\u2B50',
      position: 'absolute',
      top: '-5px',
      bottom: 0,
      left: 0,
      right: 0,
      fontSize: '1.5em'
    }
  },
  control__option_past: { ...filledStar },
  control__option_selected: { ...filledStar },
  ...[...ratingColours.entries()].reduce(
    (p, [k, color]) => ({
      ...p,
      [k]: {
        '&::hover, &.rating-control__option--past, &.rating-control__option--selected': {
          'input::before': {
            color
          }
        }
      }
    }),
    {}
  )
});
