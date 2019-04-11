import { sheet } from './nano';
import {
  fileUploaderBorderColour,
  fileUploaderBorderColourFocused
} from './variables';

export default sheet({
  selector: {
    minHeight: '91px'
  },
  selector__urlUploader: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    paddingRight: '5px',
    borderBottom: `2px solid ${fileUploaderBorderColour}`,
    marginBottom: '5px'
  },
  selector__urlUploader_focused: {
    borderColor: fileUploaderBorderColourFocused
  },
  selector__url: {
    width: '100%',
    paddingLeft: '0 !important',
    paddingBottom: '0 !important'
  },
  selector__urlInput: {
    borderBottom: 'none !important'
  },
  selector__display: {
    display: 'flex'
  },
  selector__text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px'
  },
  error: {
    color: '#f00'
  }
});
