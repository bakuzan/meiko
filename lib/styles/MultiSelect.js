import { sheet } from './nano';
import { standardShadow } from './shared';
import { zIndexes } from './variables';

const fullSizeMinusPadding = 'calc(100% - 10px)';

export default sheet({
  multiSelect: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '100px',
    minHeight: '25px',
    border: 'none'
  },
  multiSelect__display: {
    '&.has-float-label input:placeholder-shown:not(:focus) + :not(.input-has-content)': {
      top: '1em'
    },
    '&, & input': {
      cursor: 'pointer'
    }
  },
  multiSelect__dropdown: {
    position: 'absolute',
    top: fullSizeMinusPadding,
    display: 'none',
    width: fullSizeMinusPadding,
    zIndex: zIndexes.get('popover'),
    ...standardShadow
  },
  multiSelect__dropdown_open: {
    display: 'flex'
  },
  multiSelect__list: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '5px',
    margin: '5px 0',
    listStyleType: 'none',
    '& li': {
      flexBasis: '100%'
    }
  },
  separator: {
    height: '1px',
    borderBottom: '1px solid',
    opacity: 0.2
  }
});
