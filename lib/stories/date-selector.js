import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

import { DateSelector } from '../index';
import { formatDateForInput } from 'utils/date';

const TODAY = formatDateForInput(new Date());
const style = {
  maxWidth: '300px',
  margin: 'auto',
  marginTop: '20px'
};

function DateSelectorStory(props) {
  return (
    <div style={style}>
      {withState({ value: TODAY })(({ store }) => (
        <DateSelector
          name="story"
          {...store.state}
          {...props}
          onChange={value => store.set({ value })}
        />
      ))()}
    </div>
  );
}

storiesOf('DateSelector', module)
  .add('basic', () => <DateSelectorStory />)
  .add('basic - flat', () => <DateSelectorStory isFlat />)
  .add('disabled', () => <DateSelectorStory disabled={true} />)
  .add('disabled - flat', () => <DateSelectorStory isFlat disabled={true} />)
  .add('min and max date', () => (
    <DateSelectorStory afterDate="2018-04-23" beforeDate="2018-06-02" />
  ));
