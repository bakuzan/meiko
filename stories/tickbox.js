import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { MkoContext } from 'mko-book';

import Tickbox from '@/Tickbox';

function TickboxStory() {
  const [state, setState] = useContext(MkoContext);

  return (
    <Tickbox
      id="tick"
      text={text('Text', 'Tickbox Option')}
      checked={state.checked}
      disabled={boolean('Disabled', false)}
      onChange={(e) => setState({ checked: e.target.checked })}
    />
  );
}

storiesOf('Tickbox', module)
  .addDecorator(withKnobs)
  .addParameters({
    props: {
      propTables: [Tickbox],
      propTablesExclude: [TickboxStory]
    },
    mko: { defaultValues: { checked: false } }
  })
  .add('basic', () => <TickboxStory />);
