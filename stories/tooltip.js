import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Tooltip from '@/Tooltip';

function TooltipStory(props) {
  return (
    <div>
      <style>
        {`
          .tooltip { 
            --tooltip-background: var(--meiko--active); 
            --tooltip-colour: #000; 
          }
        `}
      </style>
      <Tooltip text={text('Tooltip text', "I'm a tooltip!")} {...props}>
        <div
          style={{
            width: 200,
            height: 100,
            background: `var(--meiko--primary)`
          }}
        >
          This is some text which will have a tooltip when hovered
        </div>
      </Tooltip>
    </div>
  );
}

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .addParameters({
    props: {
      propTables: [Tooltip],
      propTablesExclude: [TooltipStory]
    },
    mko: { style: { height: 200, alignItems: 'center' } }
  })
  .add('basic', () => <TooltipStory />)
  .add('with delay', () => <TooltipStory delay={1000} />)
  .add('with highlight', () => <TooltipStory highlight={true} />)
  .add('with wrapping', () => <TooltipStory allowWrapping={true} />)
  .add('positioned', () => <TooltipStory usePosition={true} />)
  .add('centered', () => <TooltipStory center={true} />)
  .add('disabled', () => <TooltipStory isEnabled={false} />);
