import { sheet } from './nano';
import {
  tabControlBorderColour,
  tabControlBorderBottomColour,
  zIndexes
} from './variables';

const tabControlsHeight = '31px';

export default sheet({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    margin: '5px 0'
  },
  controls: {
    display: 'flex',
    height: tabControlsHeight,
    padding: '0 5px',
    margin: 0,
    whiteSpace: 'nowrap',
    listStyleType: 'none'
  },
  tabControl: {
    display: 'inline-flex',
    padding: '2px',
    margin: '0 1px',
    border: `1px solid ${tabControlBorderColour}`,
    borderBottomColor: tabControlBorderBottomColour,
    zIndex: zIndexes.get('above-siblings')
  },
  panels: {
    position: 'relative',
    height: `calc(100% - ${tabControlsHeight})`,
    minWidth: '400px',
    borderTop: '1px solid'
  },
  view: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: '5px',
    margin: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 1s ease-in-out',
    pointerEvents: 'none'
  },
  view_active: {
    position: 'relative',
    opacity: 1,
    visibility: 'visible',
    pointerEvents: 'auto',
    zIndex: zIndexes.get('above-siblings')
  }
});
