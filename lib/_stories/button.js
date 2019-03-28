import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';

import Icons from '_constants/icons';
import { Button } from 'Button';
import { CenterDecorator } from '_stories';

const actions = {
  onClick: action('clicked')
};

const iconOptions = Icons;

storiesOf('Button', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(CenterDecorator)
  .addDecorator((storyFn) => {
    return (
      <div>
        <style>
          {`
            .button:not(.primary) {
              background-color: #fff;
              color: #000;
            }
            .button:not(.primary):hover {
              background-color: #eee;
            }

            .button.primary {
              background: #db7093;
              color: #fff;
            }

            .button.primary:hover {
              background: #d14774;
            }

            .button.accent {
              background: #afeeee;
              color: #000;
            }
            .button.accent:hover {
              background: #85e5e5;
            }

            .solo-button {
              height: 100px;
              text-transform: uppercase;
              transform: rotate(-10deg);
            }
        `}
        </style>
        {storyFn()}
      </div>
    );
  })
  .add('basic', () => (
    <Button
      {...actions}
      btnStyle={select(
        'Style',
        {
          None: null,
          Primary: 'primary',
          Accent: 'accent'
        },
        '',
        'style'
      )}
      btnSize={select(
        'Size',
        {
          None: null,
          Small: 'small'
        },
        '',
        'style'
      )}
      link={boolean('Link', false)}
      disabled={boolean('Disabled', false, 'functional')}
      icon={select('Icon', { ...iconOptions, None: null }, null, 'functional')}
    >
      {text('Button Text', 'I am a Basic Button. Click me!', 'functional')}
    </Button>
  ))
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
  .add('other props', () => (
    <Button {...actions} id="story-button" className="solo-button">
      I've got an Id and custom className.
    </Button>
  ));
