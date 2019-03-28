import { sheet } from './nano';

const tagChipStyles = {
  tagChip: {
    height: '32px',
    lineHeight: '32px',
    padding: '0 12px',
    border: 0,
    borderRadius: '16px',
    backgroundColor: '#dedede',
    display: 'inline-block',
    color: 'rgba(0, 0, 0, 0.87)',
    margin: '1px 0',
    whiteSpace: 'nowrap'
  },
  tagChip_clickable: {
    cursor: 'pointer'
  },
  tagChip_deletable: {
    paddingRight: '4px'
  },
  tagChip__delete: {
    display: 'inline-block !important',
    verticalAlign: 'middle',
    overflow: 'hidden',
    textAlign: 'center',
    height: '24px',
    width: '24px',
    background: '0 0',
    opacity: 0.54,
    cursor: 'pointer',
    padding: 0,
    margin: '0 0 0 4px',
    fontSize: '13px',
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    border: 'none',
    outline: 'none'
  },
  tagChip__text: {
    display: 'inline-block',
    verticalAlign: 'middle',
    fontSize: '1em'
  }
};

export default sheet(tagChipStyles);
