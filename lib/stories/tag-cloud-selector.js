import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

import { storyStyle } from '.';

import { TagCloudSelector } from 'components';

const OPTIONS = [
  { id: 1, name: 'react' },
  { id: 2, name: 'jquery' },
  { id: 3, name: 'angular' },
  { id: 4, name: 'elm' },
  { id: 5, name: 'graphql' },
  { id: 6, name: 'apollo' },
  { id: 7, name: 'python' },
  { id: 8, name: 'rust' }
];

function TagCloudStory(props) {
  return (
    <div style={storyStyle}>
      {withState({ selectedTags: [] })(({ store }) => (
        <TagCloudSelector
          {...props}
          {...store.state}
          name="selectedTags"
          className="meiko-multiselect"
          tagOptions={OPTIONS}
          onSelect={(values, name) => store.set({ [name]: values })}
        />
      ))()}
    </div>
  );
}

storiesOf('TagCloudSelector', module).add('basic', () => <TagCloudStory />);
