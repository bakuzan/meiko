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
    borderBottom: `2px solid ${fileUploaderBorderColour}`,
    marginBottom: '5px'
  },
  selector__urlUploader_focused: {
    borderColor: fileUploaderBorderColourFocused
  },
  selector__url: {
    width: '100%',
    paddingBottom: '0 !important',
    '& .clearable-input__under': {
      padding: 0
    }
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
