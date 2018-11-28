import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components/Button';
import './FileUploader.scss';

const displayFileName = (str) => str.slice(0).replace(/^.*\\/g, '');

class FileUploader extends Component {
  handleUserInput(event) {
    event.stopPropagation();
    this.props.onFileSelect(event);
  }

  handleFileUpload() {
    this.fileInput.click();
  }

  render() {
    const { className, name, value, placeholder } = this.props;

    return (
      <div className={classNames('file-uploader', className)}>
        <input
          ref={(element) => (this.fileInput = element)}
          type="file"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e) => this.handleUserInput(e)}
        />
        <div className={classNames('file-value')}>
          {displayFileName(value) || 'Nothing selected'}
        </div>
        <Button
          className="ripple"
          btnStyle="primary"
          onClick={() => this.handleFileUpload()}
        >
          {placeholder}
        </Button>
      </div>
    );
  }
}

FileUploader.defaultProps = {
  placeholder: 'upload'
};

FileUploader.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onFileSelect: PropTypes.func.isRequired
};

export default FileUploader;
