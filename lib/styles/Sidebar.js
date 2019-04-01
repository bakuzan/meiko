import { sheet } from './nano';
import { sidebarWidthOpen, zIndexes, sidebarWidthCollapsed } from './variables';

export default sheet({
  sidebar: {
    position: 'fixed',
    top: '50px',
    height: '100%',
    width: sidebarWidthOpen,
    zIndex: zIndexes.get('header')
  },
  sidebar_hidden: {
    display: 'none'
  },
  sidebar_collapsed: {
    width: sidebarWidthCollapsed,
    '& .sidebar__toggler': {
      justifyContent: 'center'
    },
    '& .sidebar-link__text': {
      display: 'none'
    },
    '& .sidebar-link__icon': {
      display: 'flex',
      flex: '1 1 20%'
    }
  },
  sidebar__toggler: {
    justifyContent: 'flex-end',
    minWidth: '40px',
    width: '100%',
    padding: '5px 20px',
    margin: 0
  },
  sidebar__menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none'
  },
  sidebar__item: {
    width: '100%',
    height: '50px',
    '& > a': {
      minWidth: '100%',
      width: '100%',
      height: '100%'
    }
  },
  sidebarLink__text: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: '1 1 80%',
    marginLeft: '5px'
  },
  sidebarLink__icon: {
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
