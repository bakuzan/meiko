import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import SVGLogo from 'Logo';

storiesOf('SVGLogo', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <div>
      <style>
        {`
          .svg-logo svg { background-color: palevioletred; }
          .svg-logo text { fill: paleturquoise; }
        `}
      </style>
      <SVGLogo text={text('Text', 'Story')} />
    </div>
  ));
