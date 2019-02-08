import { fixed, none, visible, hidden } from 'styles/types';

const size = '1em';

export default {
  AppInformation: {
    position: fixed,
    bottom: 0,
    right: 0,
    width: size,
    height: size,
    padding: '0.2em',
    ':before': {
      content: 'attr(data-icon)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: size,
      height: size
    }
  },
  AppInformationDetail: {
    position: fixed,
    right: '-100%',
    bottom: 0,
    backgroundColor: 'inherit',
    padding: '5px',
    margin: '1em',
    border: '1px solid',
    pointerEvents: none,
    visibility: hidden,
    transition: '1s'
  },
  AppInformationDetailVisible: {
    transition: '1s',
    visibility: visible,
    right: 0
  }
};
