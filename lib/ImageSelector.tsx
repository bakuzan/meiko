import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { Button } from './Button';
import Dialog from './Dialog';
import ClearableInput from './ClearableInput';
import FileUploader from './FileUploader';
import { isString, convertToBase64 } from './_utils';
import MeikoFetch from './_utils/fetch';
import Urls from './_constants/urls';

import './FileUploader/FileUploader.scss';

interface IImageSelectorProps {
  className?: string;
  uploaderClassName?: string;
  name: string;
  url: string;
  onChange(e: any): void;
  onError?(error: IImageUploadError): void;
}
interface IImageSelectorState {
  imageFile: File;
  imageUrl: string;
  imageMessage: string;
}
interface IImageUploadError {
  error: string;
  message: string;
}

const defaults = {
  imageFile: null,
  imageUrl: '',
  imageMessage: ''
};

class ImageSelector extends React.Component<
  IImageSelectorProps,
  IImageSelectorState
> {
  static defaultProps = {
    name: 'image'
  };

  static propTypes = {
    className: PropTypes.string,
    uploaderClassName: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onError: PropTypes.func
  };

  dialog = null;

  constructor(props: IImageSelectorProps) {
    super(props);
    this.state = defaults;

    this.assignDialogRef = this.assignDialogRef.bind(this);
    this.postToImgur = this.postToImgur.bind(this);
    this.handleImgurResponse = this.handleImgurResponse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleUserSelection = this.handleUserSelection.bind(this);
    this.exitImageSelector = this.exitImageSelector.bind(this);
  }

  assignDialogRef(element) {
    this.dialog = element;
  }

  postToImgur(url: string) {
    return (image) => MeikoFetch(url, 'POST', { image });
  }

  handleImgurResponse(result) {
    const isSuccessful = result && result.success;

    this.props.onChange({
      target: {
        name: this.props.name,
        type: 'text',
        value: isSuccessful ? result.url : Urls.images.deadImage
      }
    });

    if (!isSuccessful && this.props.onError) {
      const imageUploadError = {
        error: result.error,
        message: 'Failed to upload image.'
      };
      this.props.onError(imageUploadError);
    }
  }

  handleSubmit(event) {
    const data = this.state.imageFile || this.state.imageUrl;
    const isStringData = isString(data);
    const imgurUrl = isStringData ? Urls.imgur.postUrl : Urls.imgur.postFile;

    const requestImgur = this.postToImgur(imgurUrl);
    this.exitImageSelector();

    if (isStringData) {
      return requestImgur(data).then(this.handleImgurResponse);
    }

    return convertToBase64(
      data as File,
      (function affixSelector(selector) {
        return function queryCallback() {
          requestImgur(this.result).then(selector.handleImgurResponse);
        };
      })(this)
    );
  }

  exitImageSelector() {
    this.setState(defaults);
    this.dialog.close();
  }

  handleOpenDialog() {
    this.dialog.showModal();
  }

  handleUserSelection(event) {
    const { name, value, files } = event.target;
    const hasFiles = !!files && files.length;
    this.setState({
      ...defaults,
      [name]: hasFiles ? files[0] : value,
      imageMessage: hasFiles ? value : ''
    });
  }

  render() {
    return (
      <div className={classNames('file-uploader', this.props.className)}>
        <div className={classNames('file-value')}>
          {this.props.url || 'Nothing selected'}
        </div>
        <Button
          className="ripple"
          btnStyle="primary"
          onClick={this.handleOpenDialog}
        >
          Select image
        </Button>
        <Dialog
          name="image-selection"
          title="Select an image"
          getDialogRef={this.assignDialogRef}
          actionText="Save"
          action={this.handleSubmit}
          isForm={false}
          hasBackdrop={false}
        >
          <ClearableInput
            id="imageUrl"
            name="imageUrl"
            label="Image Url"
            value={this.state.imageUrl}
            onChange={this.handleUserSelection}
          />

          <FileUploader
            className={this.props.uploaderClassName}
            id="imageFile"
            name="imageFile"
            value={this.state.imageMessage}
            placeholder="upload image"
            onFileSelect={this.handleUserSelection}
          />
        </Dialog>
      </div>
    );
  }
}

export default ImageSelector;
