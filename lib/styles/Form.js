import { sheet } from './nano';

export default sheet({
  mkoForm: {
    flexDirection: 'column'
  },
  title: {
    margin: '15px 0 10px',
    fontSize: '1.2em'
  },
  form: {
    '& .input-container, & .select-container': {
      width: '100%'
    },
    '& .button-group': {
      width: '100%',
      justifyContent: 'flex-end'
    }
  }
});
