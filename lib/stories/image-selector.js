import fetchMock from 'fetch-mock';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ImageSelector } from '../index';

const actions = {
  onChange: action('changed image')
};

const payload = 'fake-image-url';

storiesOf('ImageSelector', module).add('basic', () => {
  fetchMock
    .restore()
    .getOnce('http://localhost:7200/api/image-upload/file', payload)
    .catch((...ttt) => payload);

  return <ImageSelector name="storyImage" url="" {...actions} />;
});
