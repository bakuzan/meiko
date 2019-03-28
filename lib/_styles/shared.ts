import { sheet } from './nano';

const sharedStyles = {
  flexSpacer: {
    display: 'flex',
    flex: 1
  },
  centerContents: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
};

export default sheet(sharedStyles);
