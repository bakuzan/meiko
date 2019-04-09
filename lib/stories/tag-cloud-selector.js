import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { MkoContext } from 'mko-book';

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
  const [state, setState] = useContext(MkoContext);

  return (
    <div style={{ ...storyStyle, maxWidth: '450px' }}>
      <TagCloudSelector
        {...state}
        name="selectedTags"
        className="meiko-multiselect"
        tagOptions={OPTIONS}
        onSelect={(values, name) => setState({ [name]: values })}
        {...props}
      />
    </div>
  );
}

storiesOf('TagCloudSelector', module)
  .addDecorator(withKnobs)
  .addParameters({
    props: {
      propTables: [TagCloudSelector],
      propTablesExclude: [TagCloudStory]
    },
    mko: { defaultValues: { selectedTags: [] } }
  })
  .add('basic', () => <TagCloudStory />)
  .add('with counts', () => (
    <TagCloudStory
      sizeRelativeToCount={boolean('Size Relative to Count', true)}
    />
  ));
