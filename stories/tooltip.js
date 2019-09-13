import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Tooltip from 'Tooltip';

function TooltipStory() {
  return (
    <Tooltip text={text('Tooltip text', "I'm a tooltip!")}>
      <div style={{ width: 100, height: 100 }}>
        This is some text which will have a tooltip when hovered
      </div>
    </Tooltip>
  );
}

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .addParameters({
    props: {
      propTables: [Tooltip],
      propTablesExclude: [TooltipStory]
    }
  })
  .add('basic', () => <TooltipStory />)
  .add('with delay', () => <TooltipStory delay={1000} />)
  .add('with highlight', () => <TooltipStory highlight={true} />)
  .add('with wrapping', () => <TooltipStory allowWrapping={true} />)
  .add('positioned', () => <TooltipStory usePosition={true} />)
  .add('centered', () => <TooltipStory center={true} />)
  .add('disabled', () => <TooltipStory isEnabled={false} />);
