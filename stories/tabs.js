import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { MkoContext } from 'mko-book';

import { action } from '@storybook/addon-actions';

import Tabs from 'Tabs';

function TabStory() {
  const [{ tab }, setState] = useContext(MkoContext);

  return (
    <Tabs.Container
      activeTab={tab}
      onChange={(name) => setState({ tab: name })}
    >
      <Tabs.View name="one">
        {(isActive) => isActive && <div>this is the first tab...</div>}
      </Tabs.View>
      <Tabs.View name="two">
        {(isActive) => isActive && <div>...and this is another tab</div>}
      </Tabs.View>
    </Tabs.Container>
  );
}

storiesOf('Tabs', module)
  .add('basic', () => (
    <Tabs.Container>
      <Tabs.View name="one">
        <div>this is the first tab...</div>
        <button onClick={action('1')}>1</button>
        <button onClick={action('2')}>2</button>
      </Tabs.View>
      <Tabs.View name="two">
        <div>...and this is another tab</div>
        <button onClick={action('3')}>3</button>
        <button onClick={action('4')}>4</button>
      </Tabs.View>
    </Tabs.Container>
  ))
  .add('with on change callback', () => (
    <Tabs.Container onChange={action('tab is active')}>
      <Tabs.View name="one">
        <div>this is the first tab...</div>
      </Tabs.View>
      <Tabs.View name="two">
        <div>...and this is another tab</div>
      </Tabs.View>
    </Tabs.Container>
  ))
  .add('with render props view children', () => (
    <Tabs.Container>
      <Tabs.View name="one">
        {(isActive) => isActive && <div>this is the first tab...</div>}
      </Tabs.View>
      <Tabs.View name="two">
        {(isActive) => isActive && <div>...and this is another tab</div>}
      </Tabs.View>
    </Tabs.Container>
  ))
  .add('with controlled activeTab', () => <TabStory />, {
    props: {
      propTables: [Tabs.Container, Tabs.View],
      propTablesExclude: [TabStory]
    },
    mko: { defaultValues: { tab: 'one' } }
  });
