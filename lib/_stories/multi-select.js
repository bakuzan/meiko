import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';


import { storyStyle } from '.';

import MultiSelect from 'MultiSelect';

const options = [
  { value: 1, text: 'Gen1' },
  { value: 2, text: 'Gen2' },
  { value: 3, text: 'Gen3' },
  { value: 4, text: 'Gen4' }
];

function MultiSelectStory(props) {
  return (
    <div style={storyStyle}>
      <style>{`
        .story-list {
          background: #eee;
        }
      `}</style>
      {withState({ values: [] })(
        withInfo()(({ store }) => (
          <React.Fragment>
            <button>YOYO</button>
            <button>YOYO</button>
            <MultiSelect
              {...props}
              {...store.state}
              listClassName="story-list"
              className="meiko-multiselect"
              name="multiSelect"
              placeholder="Select a gen"
              options={options}
              onUpdate={(values) => store.set({ values })}
            />
            <button>YOYO</button>
            <button>YOYO</button>
          </React.Fragment>
        ))
      )()}
    </div>
  );
}

storiesOf('MultiSelect', module).add('basic', () => {
  return MultiSelectStory({});
});
