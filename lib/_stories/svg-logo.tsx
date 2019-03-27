import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';

import SVGLogo from 'components/SVGLogo';
import { CenterDecorator } from 'stories';

storiesOf('SVGLogo', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(CenterDecorator)
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
