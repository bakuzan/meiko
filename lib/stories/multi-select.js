import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

import { MultiSelect } from '../index';

const style = {
  maxWidth: '300px',
  margin: 'auto',
  marginTop: '20px'
};

const options = [
  { value: 1, text: 'Gen1' },
  { value: 2, text: 'Gen2' },
  { value: 3, text: 'Gen3' },
  { value: 4, text: 'Gen4' }
  // { value: 5, text: "Gen5" },
  // { value: 6, text: "Gen6" },
  // { value: 7, text: "Gen7" },
];

function MultiSelectStory(props) {
  return (
    <div style={style}>
      {withState({ values: [] })(({ store }) => (
        <MultiSelect
          {...props}
          {...store.state}
          listClassName="story-list"
          className="meiko-multiselect"
          name="multiSelect"
          placeholder="Select a gen"
          options={options}
          onUpdate={values => store.set({ values })}
        />
      ))()}
    </div>
  );
}

storiesOf('MultiSelect', module).add('basic', () => {
  return <MultiSelectStory />;
});
