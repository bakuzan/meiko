import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

import { storyStyle } from '.';

import DateSelector from 'components/DateSelector';
import { formatDateForInput } from 'utils/date';

const TODAY = formatDateForInput(new Date());

function DateSelectorStory(props) {
  return (
    <div style={storyStyle}>
      {withState({ value: TODAY })(({ store }) => (
        <DateSelector
          name="story"
          {...store.state}
          {...props}
          onChange={(value) => store.set({ value })}
        />
      ))()}
    </div>
  );
}

storiesOf('DateSelector', module)
  .add('basic', () => <DateSelectorStory />)
  .add('basic - flat', () => <DateSelectorStory isFlat />)
  .add('required', () => <DateSelectorStory required={true} />)
  .add('disabled', () => <DateSelectorStory disabled={true} />)
  .add('disabled - flat', () => <DateSelectorStory isFlat disabled={true} />)
  .add('min and max date', () => (
    <DateSelectorStory afterDate="2018-04-23" beforeDate="2018-06-02" />
  ));
