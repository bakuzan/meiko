import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, date } from '@storybook/addon-knobs';
import { storyStyle } from '.';

import DateSelector from 'components/DateSelector';
import { formatDateForInput } from 'utils';

const TODAY = formatDateForInput(new Date());

function DateSelectorStory(props) {
  return (
    <div style={storyStyle}>
      {withState({ value: TODAY })(
        withInfo()(({ store }) => (
          <DateSelector
            id="story"
            name="story"
            {...store.state}
            {...props}
            onChange={(value) => store.set({ value })}
          />
        ))
      )()}
    </div>
  );
}

storiesOf('DateSelector', module)
  .addDecorator(withKnobs)
  .add('basic', () => <DateSelectorStory />)
  .add('basic - flat', () => <DateSelectorStory isFlat />)
  .add('required', () => <DateSelectorStory required={true} />)
  .add('disabled', () => <DateSelectorStory disabled={true} />)
  .add('disabled - flat', () => <DateSelectorStory isFlat disabled={true} />)
  .add('min and max date', () => (
    <DateSelectorStory
      afterDate={date('After Date', new Date('2018-04-23'), 'Date Range')}
      beforeDate={date('Before Date', new Date('2018-06-02'), 'Date Range')}
    />
  ));
