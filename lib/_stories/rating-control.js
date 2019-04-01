import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { MkoContext } from 'mko-book';

import RatingControl from 'RatingControl';

function RatingStory() {
  const [state, setState] = useContext(MkoContext);

  return (
    <RatingControl
      id="rating"
      name="rating"
      value={state.value}
      label={text('Label', '')}
      onChange={(e) => setState({ value: e.target.value })}
    />
  );
}

storiesOf('RatingControl', module)
  .addDecorator(withKnobs)
  .addParameters({
    props: { propTables: [RatingControl], propTablesExclude: [RatingStory] },
    mko: { defaultValues: { value: 0 } }
  })
  .add('basic', () => <RatingStory />);
