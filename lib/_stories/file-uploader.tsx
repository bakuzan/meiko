import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import FileUploader from 'components/FileUploader';

const actions = {
  onFileSelect: action('file selected')
};

storiesOf('FileUploader', module)
  .addDecorator(withInfo)
  .add('basic', () => {
    return <FileUploader id="file" name="file" value="" {...actions} />;
  });
