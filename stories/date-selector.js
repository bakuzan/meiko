import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { MkoContext } from 'mko-book';

import { withKnobs, date } from '@storybook/addon-knobs';
import { storyStyle } from '.';

import DateSelector from '@/DateSelector';
import { formatDateForInput } from '@/utils';

const TODAY = formatDateForInput(new Date());

function DateSelectorStory(props) {
  const [state, setState] = useContext(MkoContext);

  return (
    <div style={storyStyle}>
      <DateSelector
        id="story"
        name="story"
        {...state}
        {...props}
        onChange={(value) => setState({ value })}
      />
    </div>
  );
}

storiesOf('DateSelector', module)
  .addDecorator(withKnobs)
  .addParameters({
    props: {
      propTables: [DateSelector],
      propTablesExclude: [DateSelectorStory]
    },
    mko: {
      defaultValues: { value: TODAY }
    }
  })
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
