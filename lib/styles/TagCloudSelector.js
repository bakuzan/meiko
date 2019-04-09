import { sheet } from './nano';

export default sheet({
  tagCloud: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  tagCloud__options: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});
