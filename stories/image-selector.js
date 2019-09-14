import fetchMock from 'fetch-mock';
import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MkoContext } from 'mko-book';

import ImageSelector from '@/ImageSelector';

const payload = {
  good: { success: true, url: '[mko] Successfully Uploaded Image Url' },
  bad: { success: false, error: { message: '[mko] Failed Upload Message' } }
};

let timer;
function delayedResponse(shouldFail) {
  return new Promise((resolve, reject) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (shouldFail) {
        reject();
      } else {
        resolve(payload.good);
      }
    }, 1500);
  });
}

function setup(throwError = false) {
  fetchMock
    .restore()
    .post(/image-upload/, () => delayedResponse(throwError))
    .catch((...ttt) => payload.bad);
}

function ImageSelectorStory({ includeError = false, ...props }) {
  setup(includeError);
  const [state, setState] = useContext(MkoContext);

  return (
    <ImageSelector
      name="storyImage"
      url={state.value}
      {...props}
      {...{
        onChange: (e) => setState({ value: e.target.value }),
        onError: includeError ? action('upload error') : null
      }}
    />
  );
}

storiesOf('ImageSelector', module)
  .addParameters({
    mko: { defaultValues: { value: '' } },
    props: {
      propTables: [ImageSelector],
      propTablesExclude: [ImageSelectorStory]
    }
  })
  .add('basic', () => <ImageSelectorStory />)
  .add('onError', () => <ImageSelectorStory includeError />);
