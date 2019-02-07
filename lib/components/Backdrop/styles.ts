import { zIndexes } from 'styles/variables';
import { fixed } from 'styles/types';

export default {
  Backdrop: {
    position: fixed,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: zIndexes.get('above-siblings')
  }
};
