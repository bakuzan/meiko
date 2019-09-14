import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { MkoContext } from 'mko-book';

import RadioButton from '@/RadioButton';

const options = Array(3).fill(null);

function RadioStory() {
  const [state, setState] = useContext(MkoContext);

  return (
    <div className="radio-group">
      {options.map((_, i) => (
        <RadioButton
          name="storyTest"
          value={i}
          label={`Radio Number ${i + 1}`}
          checked={state.checked === i}
          onChange={() => setState({ checked: i })}
        />
      ))}
    </div>
  );
}

storiesOf('RadioButton', module)
  .addParameters({
    props: { propTables: [RadioButton], propTablesExclude: [RadioStory] },
    mko: { defaultValues: { checked: 1 } }
  })
  .add('basic', () => <RadioStory />);
