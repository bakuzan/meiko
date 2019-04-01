import { sheet } from './nano';

export default sheet({
  radio: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  radio__input: {
    appearance: 'none',
    paddingRight: '2px',
    margin: 0,
    pointerEvents: 'none',

    '&::after': {
      content: "'\u25ef'",
      color: '#aaa',
      fontSize: '1.2rem',
      verticalAlign: 'middle'
    },

    '&:checked::after': {
      content: "'\u25c9'",
      color: '#000',
      fontSize: '1.5rem'
    },

    '&[disabled]::after, &[disabled] + span': {
      color: '#bbb !important'
    }
  }
});
