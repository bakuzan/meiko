import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import Icons from 'constants/icons';
import { Button } from 'components/Button';

const actions = {
  onClick: action('clicked')
};

storiesOf('Button', module)
  .addDecorator(withInfo)
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
  .add('accent', () => (
    <Button {...actions} btnStyle="accent">
      Click me!
    </Button>
  ))
  .add('other props', () => (
    <Button {...actions} id="story-button" className="solo-button">
      Click me!
    </Button>
  ));
