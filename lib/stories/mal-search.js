import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

import { MalSearch } from '../index';

const style = {
  maxWidth: '300px',
  margin: 'auto',
  marginTop: '20px'
};

function MalSearchStory(props) {
  return (
    <div style={style}>
      {withState({ search: '', id: 0 })(({ store }) => (
        <MalSearch
          {...props}
          {...store.state}
          onUserInput={e => store.set({ search: e.target.value })}
          selectMalItem={item => store.set({ id: item.id })}
        />
      ))()}
    </div>
  );
}

storiesOf('MalSearch', module).add('basic', () => {
  return <MalSearchStory type="anime" />;
});
