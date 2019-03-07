import classNames from 'classnames';
import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Button } from '../Button';
import './FileUploader.scss';

interface IFileUploaderProps {
  className?: string;
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  onFileSelect(e: Event): void;
}

interface IFileUploaderState {
  isFocused: boolean;
}

const displayFileName = (str: string) => str.slice(0).replace(/^.*\\/g, '');

class FileUploader extends React.Component<
  IFileUploaderProps,
  IFileUploaderState
> {
  static defaultProps = {
    placeholder: 'upload'
  };

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onFileSelect: PropTypes.func.isRequired
  };

  private fileInput = null;

  constructor(props: IFileUploaderProps) {
    super(props);
    this.state = {
      isFocused: false
    };
  }

  handleUserInput(event) {
    event.stopPropagation();
    this.props.onFileSelect(event);
  }

  handleFileUpload() {
    this.fileInput.click();
  }

  render() {
    const { className, onFileSelect, ...props } = this.props;

    return (
      <div
        className={classNames(
          'file-uploader',
          { 'file-uploader--focused': this.state.isFocused },
          className
        )}
      >
        <input
          ref={(element) => (this.fileInput = element)}
          className="file-uploader__input"
          type="file"
          aria-label="select a file to upload"
          onChange={(e) => this.handleUserInput(e)}
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
          {...props}
        />
        <div className={classNames('file-value')}>
          {displayFileName(props.value) || 'Nothing selected'}
        </div>
        <Button
          className="ripple"
          btnStyle="primary"
          aria-label="select a file to upload"
          onClick={() => this.handleFileUpload()}
        >
          {props.placeholder}
        </Button>
      </div>
    );
  }
}

export default FileUploader;
