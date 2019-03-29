import classNames from 'classnames';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { Button } from './Button';

import styles from './_styles/FileUploader';

const displayFileName = (str) => str.slice(0).replace(/^.*\\/g, '');

function FileUploader({ className, onFileSelect, ...props }) {
  const [isFocused, setFocused] = useState(false);
  const fileInput = useRef();

  return (
    <div
      className={classNames(
        'file-uploader',
        { 'file-uploader--focused': isFocused },
        styles.uploader,
        isFocused && styles.uploader_focused,
        className
      )}
    >
      <input
        ref={fileInput}
        className={classNames('file-uploader__input', styles.uploader__input)}
        type="file"
        aria-label="select a file to upload"
        onChange={(event) => {
          event.stopPropagation();
          onFileSelect(event);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      <div
        className={classNames('file-uploader__value', styles.uploader__value)}
      >
        {displayFileName(props.value) || 'Nothing selected'}
      </div>
      <Button
        className="file-uploader__button"
        btnStyle="primary"
        aria-label="select a file to upload"
        onClick={() => fileInput.current && fileInput.current.click()}
      >
        {props.placeholder}
      </Button>
    </div>
  );
}

FileUploader.displayName = 'FileUploader';
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
