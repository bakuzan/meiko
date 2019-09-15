import { sheet } from './nano';

export default sheet({
  grid: {
    display: 'grid',
    padding: '5px',
    margin: '5px 0',
    listStyleType: 'none'
  },
  grid_uniformRows: {
    gridAutoRows: '1fr'
  },
  grid__noItems: {
    display: 'flex'
  }
});
