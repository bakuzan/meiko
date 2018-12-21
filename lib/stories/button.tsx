import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Icons from 'constants/icons';
import { Button } from 'components/Button';

const actions = {
  onClick: action('clicked')
};

storiesOf('Button', module)
  .add('basic', () => <Button {...actions}>Click me!</Button>)
  .add('link', () => (
    <Button {...actions} link>
      Click me!
    </Button>
  ))
  .add('icon', () => <Button {...actions} icon={Icons.cross} />)
  .add('primary', () => (
    <Button {...actions} btnStyle="primary">
      Click me!
    </Button>
  ))
  .add('secondary', () => (
    <Button {...actions} btnStyle="secondary">
      Click me!
    </Button>
  ))
  .add('other props', () => (
    <Button {...actions} id="story-button" className="solo-button">
      Click me!
    </Button>
  ));
