import { sheet } from './nano';

export default sheet({
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
