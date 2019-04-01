import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';


import FileUploader from 'FileUploader';

const actions = {
  onFileSelect: action('file selected')
};

storiesOf('FileUploader', module)
  .add('basic', () => {
    return <FileUploader id="file" name="file" value="" {...actions} />;
  });
