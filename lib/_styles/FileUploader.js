import { sheet } from './nano';

import {
  fileUploaderBorderColour,
  fileUploaderBorderColourFocused
} from './variables';
import { forScreenReader } from './shared';

export default sheet({
  uploader: {
    display: 'flex',
    padding: '5px',
    borderBottom: `2px solid ${fileUploaderBorderColour}`
  },
  uploader_focused: {
    borderColor: fileUploaderBorderColourFocused
  },
  uploader__input: {
    ...forScreenReader
  },
  uploader__value: {
    display: 'flex',
    flex: 1,
    padding: '5px'
  }
});
