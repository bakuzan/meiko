import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { withInfo } from '@storybook/addon-info';

import { storyStyle } from '.';

import MalSearch from 'MalSearch';

interface IMalStoryState {
  search: string;
  id: React.ReactText;
}

const initialState: IMalStoryState = {
  search: '',
  id: 0
};

function MalSearchStory(props) {
  return (
    <div style={storyStyle}>
      {withState(initialState)(
        withInfo()(({ store }) => (
          <MalSearch
            {...props}
            {...store.state}
            onUserInput={(e: any) => store.set({ search: e.target.value })}
            selectMalItem={(item) => store.set({ id: item.id })}
          />
        ))
      )()}
    </div>
  );
}

storiesOf('MalSearch', module).add('basic', () => {
  return MalSearchStory({ type: 'anime' });
});
