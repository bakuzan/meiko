import { sheet } from './nano';

const selectBoxStyles = {
  select: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '100px',
    minHeight: '25px',
    padding: '5px',
    border: 'none',
    cursor: 'pointer'
  }
};

export default sheet(selectBoxStyles);
