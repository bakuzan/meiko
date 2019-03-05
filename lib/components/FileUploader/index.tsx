import classNames from 'classnames';
import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Button } from '../Button';

import { Container, DisplayText, FileInput } from './styles';

interface IFileUploaderProps {
  className?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onFileSelect(e: Event): void;
}

const displayFileName = (str: string) => str.slice(0).replace(/^.*\\/g, '');

class FileUploader extends React.Component<IFileUploaderProps, any> {
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
      <Container className={classNames('file-uploader', className)}>
        <FileInput
          ref={(element) => (this.fileInput = element)}
          type="file"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e) => this.handleUserInput(e)}
        />
        <DisplayText className={classNames('file-value')}>
          {displayFileName(value) || 'Nothing selected'}
        </DisplayText>
        <Button
          className="ripple"
          btnStyle="primary"
          onClick={() => this.handleFileUpload()}
        >
          {placeholder}
        </Button>
      </Container>
    );
  }
}

export default FileUploader;
