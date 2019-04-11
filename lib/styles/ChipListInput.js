import { sheet } from './nano';

export default sheet({
  chipListInput: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: '1em !important',
    '& .clearable-input': {
      padding: 0
    }
  },
  clearButton: {
    paddingLeft: 0,
    paddingBottom: 0
  },
  chipList: {
    marginBottom: '2px'
  },
  chipList__inner: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    minHeight: '36px',
    maxWidth: '400px',
    padding: '0 2px',
    border: 0,
    borderRadius: 0,
    borderBottom: '2px solid rgba(0, 0, 0, 0.1)'
  }
});
