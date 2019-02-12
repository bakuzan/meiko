import { rowReverse, wrap } from '../../styles/types';

export default {
  ChipListInputContainer: {
    display: 'flex',
    flexDirection: rowReverse,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: '1em !important'
  },
  ChipListClearableInput: {
    paddingLeft: 0,
    paddingBottom: 0
  },
  ChipListWrapper: {
    marginBottom: '2px'
  },
  ChipListInner: {
    display: 'inline-flex',
    flexWrap: wrap,
    minHeight: '36px',
    maxWidth: '400px',
    padding: '0 2px',
    border: 0,
    borderRadius: 0,
    borderBottom: '2px solid rgba(0, 0, 0, 0.1)'
  }
};
