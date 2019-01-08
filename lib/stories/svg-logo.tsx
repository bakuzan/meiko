import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SVGLogo from 'components/SVGLogo';

storiesOf('SVGLogo', module)
  .addDecorator(withInfo)
  .add('basic', () => <SVGLogo text="Story" />);
