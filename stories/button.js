import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withKnobs, select } from '@storybook/addon-knobs';

import Icons from 'constants/icons';
import { Button } from 'Button';

const actions = {
  onClick: action('clicked')
};

const iconOptions = Icons;

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('basic', () => <Button {...actions}>Click me!</Button>)
  .add('link', () => (
    <Button {...actions} link>
      I'm a button pretending to be a link
    </Button>
  ))
  .add('icon', () => (
    <Button {...actions} icon={select('Icon', iconOptions, Icons.cross)} />
  ))
  .add('primary', () => (
    <Button {...actions} btnStyle="primary">
      I'm a primary button
    </Button>
  ))
  .add('accent', () => (
    <Button {...actions} btnStyle="accent">
      I'm an accent button
    </Button>
  ))
  .add('disabled', () => (
    <Button {...actions} disabled>
      I'm disabled
    </Button>
  ))
  .add('other props', () => (
    <Button {...actions} id="story-button" className="solo-button">
      I've got an Id and custom className.
    </Button>
  ));
