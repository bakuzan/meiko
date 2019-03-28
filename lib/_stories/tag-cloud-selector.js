import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, object } from '@storybook/addon-knobs';

import { storyStyle } from '.';

import TagCloudSelector from 'TagCloudSelector';

const OPTIONS = [
  { id: 1, name: 'react', count: 5 },
  { id: 2, name: 'jquery', count: 0 },
  { id: 3, name: 'angular', count: 0 },
  { id: 4, name: 'elm', count: 2 },
  { id: 5, name: 'graphql', count: 3 },
  { id: 6, name: 'apollo', count: 1 },
  { id: 7, name: 'python', count: 1 },
  { id: 8, name: 'rust', count: 1 }
];

function TagCloudStory(props) {
  return (
    <div style={storyStyle}>
      {withState({ selectedTags: [] })(
        withInfo()(({ store }) => (
          <TagCloudSelector
            {...store.state}
            name="selectedTags"
            className="meiko-multiselect"
            tagOptions={OPTIONS}
            onSelect={(values, name) => store.set({ [name]: values })}
            {...props}
          />
        ))
      )()}
    </div>
  );
}

storiesOf('TagCloudSelector', module)
  .addDecorator(withKnobs)
  .add('basic', () => TagCloudStory({}))
  .add('with counts', () => TagCloudStory({ sizeRelativeToCount: true }))
  .add('interactive', () =>
    TagCloudStory({
      sizeRelativeToCount: boolean('Size relative', false),
      tagOptions: object('Tag Options', OPTIONS)
    })
  );
