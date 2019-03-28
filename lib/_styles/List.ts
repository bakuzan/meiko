import { sheet } from './nano';

export default sheet({
  list: {
    display: 'flex',
    padding: '5px',
    margin: '5px 0',
    listStyleType: 'none'
  },
  list_wrap: {
    flexFlow: 'wrap'
  },
  list_column: {
    flexDirection: 'column'
  },
  ...Array(5)
    .fill(1)
    .reduce(
      (p, n, i) => ({
        ...p,
        [`list--columns_${n + i}`]: { flexBasis: `calc(100% / ${n + i})` }
      }),
      {}
    )
});
