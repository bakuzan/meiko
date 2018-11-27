import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React, { Component } from 'react';

import { Button } from 'components/Button';
import Dialog from 'components/Dialog';
import ClearableInput from 'components/ClearableInput';
import FileUploader from 'components/FileUploader';
import { isString, convertToBase64 } from 'utils';
import MeikoFetch from 'utils/fetch';
import Urls from 'constants/urls';

import styles from 'components/FileUploader/FileUploader.scss';

const cx = classNames.bind(styles);

const defaults = {
  imageFile: '',
  imageUrl: '',
  imageMessage: ''
};

class ImageSelector extends Component {
  constructor(props) {
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

  postToImgur(url) {
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

    if (isStringData) return requestImgur(data).then(this.handleImgurResponse);
    return convertToBase64(
      data,
      (function(selector) {
        return function() {
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
      <div className={cx('file-uploader', this.props.className)}>
        <div className={cx('file-value')}>
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
            name="imageUrl"
            label="Image Url"
            value={this.state.imageUrl}
            onChange={this.handleUserSelection}
          />

          <FileUploader
            className={this.props.uploaderClassName}
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

ImageSelector.defaultProps = {
  name: 'image'
};

ImageSelector.propTypes = {
  className: PropTypes.string,
  uploaderClassName: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func
};

export default ImageSelector;
