import { sheet } from './nano';
import { zIndexes, uiMessaging } from './variables';

const alertContainerHeight = '40px';
const alertIconWidth = alertContainerHeight;
const fontSize = '16px';

export default sheet({
  container: {
    position: 'fixed',
    top: '50px',
    left: '50%',
    width: '50%',
    height: alertContainerHeight,
    transform: 'translateX(-50%)',
    zIndex: zIndexes.get('alert')
  },
  alert: {
    width: '100%',
    backgroundColor: '#fff',
    color: '#000',
    padding: 0,
    borderRadius: 'inherit',
    margin: 0,
    boxShadow: '1px 1px 10px 1px',
    zIndex: zIndexes.get('above-siblings')
  },
  alert__title: {
    display: 'flex',
    flex: 1,
    marginLeft: '10px',
    fontSize
  },
  alert__actions: {
    display: 'flex',
    margin: 0,
    '& button': {
      minWidth: 'auto'
    }
  },
  close: {
    '&::before': {
      fontSize: '1rem'
    }
  },
  alert__content: {
    display: 'flex',
    flexDirection: 'column',
    height: alertContainerHeight
  },
  alert__content_expanded: {
    height: 'auto',
    '& .alert__message': {
      height: 'auto'
    },
    '& .alert__details': {
      display: 'flex',
      width: 'auto',
      overflow: 'hidden'
    }
  },
  alert__message: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: alertContainerHeight
  },
  alert__icon: {
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
  alert__details: {
    display: 'none',
    padding: '10px 0',
    paddingLeft: '5px',
    marginLeft: alertIconWidth,
    whiteSpace: 'pre-line',
    wordWrap: 'break-word'
  },
  ...[...uiMessaging.entries()].reduce(
    (p, [k, data]) => ({
      ...p,
      [k]: {
        '& .alert__icon': {
          backgroundColor: data.background,
          color: data.colour,
          '&::before': {
            content: `"${data.icon}"`
          }
        }
      }
    }),
    {}
  )
});
