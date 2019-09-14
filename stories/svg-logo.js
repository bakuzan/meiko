import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import SVGLogo from '@/Logo';

storiesOf('SVGLogo', module)
  .addDecorator(withKnobs)
  .add('basic', () => <SVGLogo text={text('Text', 'Story')} />);
