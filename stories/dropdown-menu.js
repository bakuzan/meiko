import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { MkoContext } from 'mko-book';

import DropdownMenu from '@/DropdownMenu';
import Tickbox from '@/Tickbox';
import { Button } from '@/Button';
import { PositionEnum } from '@/constants/enums';

function DropdownItem({ children }) {
  return <li style={{ padding: '5px' }}>{children}</li>;
}

function DropdownMenuStory(props) {
  const [state, setState] = useContext(MkoContext);

  return (
    <DropdownMenu id="story" {...props}>
      <DropdownItem>Test item</DropdownItem>
      <DropdownItem>And another one!</DropdownItem>
      <DropdownItem>
        <Tickbox
          id="setting"
          checked={state.checked}
          onChange={(e) => setState({ checked: e.target.checked })}
          text="A setting"
        />
      </DropdownItem>
      <DropdownItem>
        <Button btnStyle="primary">An action</Button>
      </DropdownItem>
    </DropdownMenu>
  );
}

storiesOf('DropdownMenu', module)
  .addDecorator(withKnobs)
  .addParameters({
    props: {
      propTables: [DropdownMenu],
      propTablesExclude: [DropdownMenuStory, Tickbox, Button]
    },
    mko: {
      defaultValues: { checked: false },
      style: { height: '1000px' }
    }
  })
  .add('basic - left', () => <DropdownMenuStory align={PositionEnum.left} />)
  .add('basic - center', () => (
    <DropdownMenuStory align={PositionEnum.center} />
  ))
  .add('basic - right', () => <DropdownMenuStory align={PositionEnum.right} />)
  .add('interactive', () => (
    <DropdownMenuStory
      align={select('Align', PositionEnum, PositionEnum.Left)}
    />
  ));
