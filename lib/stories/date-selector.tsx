import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { withInfo } from '@storybook/addon-info';
import { storyStyle } from '.';

import DateSelector from 'components/DateSelector';
import { DateFormat } from 'utils/date';

const TODAY = DateFormat.formatDateForInput(new Date());

function DateSelectorStory(props) {
  return (
    <div style={storyStyle}>
      {withState({ value: TODAY })(
        withInfo()(({ store }) => (
          <DateSelector
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
  .add('basic', () => <DateSelectorStory />)
  .add('basic - flat', () => <DateSelectorStory isFlat />)
  .add('required', () => <DateSelectorStory required={true} />)
  .add('disabled', () => <DateSelectorStory disabled={true} />)
  .add('disabled - flat', () => <DateSelectorStory isFlat disabled={true} />)
  .add('min and max date', () => (
    <DateSelectorStory afterDate="2018-04-23" beforeDate="2018-06-02" />
  ));
