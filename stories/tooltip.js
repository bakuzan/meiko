import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Tooltip from '@/Tooltip';

const leftAlign = {
  mko: { style: { justifyContent: `flex-start`, marginLeft: `25px` } }
};
const rightAlign = {
  mko: { style: { justifyContent: `flex-end`, marginRight: `25px` } }
};

const LONG_TEXT =
  'This is a really long tooltip to test the offscreen protection.';

function TooltipStory({ containerStyle = {}, ...props }) {
  return (
    <div style={containerStyle}>
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
  .add('disabled', () => <TooltipStory isEnabled={false} />)
  .add(
    'offscreen LHS - standard',
    () => <TooltipStory text={LONG_TEXT} />,
    leftAlign
  )
  .add(
    'offscreen LHS - centered',
    () => <TooltipStory text={LONG_TEXT} center={true} />,
    leftAlign
  )
  .add(
    'offscreen LHS - positioned',
    () => <TooltipStory text={LONG_TEXT} usePosition={true} />,
    leftAlign
  )
  .add(
    'offscreen RHS - standard',
    () => <TooltipStory text={LONG_TEXT} />,
    rightAlign
  )
  .add(
    'offscreen RHS - centered',
    () => <TooltipStory text={LONG_TEXT} center={true} />,
    rightAlign
  )
  .add(
    'offscreen RHS - positioned',
    () => <TooltipStory text={LONG_TEXT} usePosition={true} />,
    rightAlign
  );
