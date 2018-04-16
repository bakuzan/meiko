import React from 'react';
import { storiesOf } from '@storybook/react';

import { SVGLogo } from 'components';

storiesOf('SVGLogo', module).add('basic', () => <SVGLogo text="Story" />);
