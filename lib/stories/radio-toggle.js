import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { MkoContext } from 'mko-book';

import RadioToggle from 'RadioToggle';
import Icons from '../constants/icons';

function RadioToggleStory(props) {
  const [state, setState] = useContext(MkoContext);

  return (
    <RadioToggle
      className="story"
      label="Switch between Dark and Light mode"
      name="theme"
      checked={state.isDarkTheme}
      onChange={(isDarkTheme) => setState({ isDarkTheme })}
      {...props}
    />
  );
}

storiesOf('RadioToggle', module)
  .addParameters({
    props: { propTables: [RadioToggle], propTablesExclude: [RadioToggleStory] },
    mko: { defaultValues: { isDarkTheme: false }, style: { height: '50px' } }
  })
  .add('basic', () => <RadioToggleStory />)
  .add('custom icons', () => (
    <RadioToggleStory icons={[Icons.left, Icons.right]} />
  ));
