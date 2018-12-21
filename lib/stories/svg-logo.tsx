import * as React from 'react';
import { storiesOf } from '@storybook/react';

import SVGLogo from 'components/SVGLogo';

storiesOf('SVGLogo', module).add('basic', () => <SVGLogo text="Story" />);
