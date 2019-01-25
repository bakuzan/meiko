import { uiMessaging, zIndexes } from 'styles/variables';

const alertContainerHeight = '40px';
const alertIconWidth = alertContainerHeight;
const fontSize = '1em';

export default {
  AlertContainer: {
    position: `relative`,
    top: '50px',
    left: '50%',
    width: '50%',
    height: alertContainerHeight,
    transform: 'translateX(-50%)',
    zIndex: zIndexes.get('alert')
  },
  Alert: {
    width: '100%',
    backgroundColor: '#fff',
    color: '#000',
    padding: 0,
    borderRadius: 'inherit',
    margin: 0,
    boxShadow: '1px 1px 10px 1px',
    zIndex: zIndexes.get('above-siblings')
  },
  AlertTitle: {
    display: 'flex',
    flex: 1,
    marginLeft: '10px',
    fontSize
  },
  ButtonGroup: {
    padding: '2px',
    margin: 0
  },
  Button: {
    minWidth: 'auto'
  },
  Close: {
    ':before': {
      fontSize: '1rem'
    }
  },
  AlertContent: {
    display: 'flex',
    flexDirection: 'column',
    height: alertContainerHeight
  },
  AlertTopContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: alertContainerHeight
  },
  AlertIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: alertIconWidth,
    height: alertIconWidth,
    color: '#fff',
    padding: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  AlertDetails: {
    display: 'none',
    padding: '10px 0',
    paddingLeft: '5px',
    marginLeft: alertIconWidth,
    whiteSpace: 'pre-line',
    wordWrap: 'break-word'
  },
  AlertContentExpanded: {
    height: 'auto'
  },
  AlertContentExpandedDetails: {
    display: 'flex',
    width: 'auto',
    overflow: 'hidden'
  },
  ...[...uiMessaging.keys()].reduce((p, k) => {
    const values = uiMessaging.get(k);
    return {
      ...p,
      [k]: {
        backgroundColor: values.background,
        color: values.colour,
        ':before': {
          content: `"${values.icon}"`
        }
      }
    };
  }, {})
};
