import fetchMock from 'fetch-mock';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';


import ImageSelector from 'ImageSelector';

const actions = {
  onChange: action('changed image')
};

const payload = {
  good: { success: true, url: 'fake-image-url' },
  bad: { success: false, error: { message: 'failed' } }
};

function setup() {
  fetchMock
    .restore()
    .getOnce('http://localhost:7200/api/image-upload/file', payload.good)
    .catch((...ttt) => payload.bad);
}

storiesOf('ImageSelector', module)
  
  .add('basic', () => {
    setup();
    return <ImageSelector name="storyImage" url="" {...actions} />;
  })
  .add('onError', () => {
    setup();

    return (
      <ImageSelector
        name="storyImage"
        url=""
        {...actions}
        onError={action('upload error')}
      />
    );
  });
