import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { AutocompleteInput } from '../index';

const list = [
  { text: 'Bat' },
  { text: 'Cat' },
  { text: 'Dingo' },
  { text: 'Earwig' },
  { text: 'Frog' }
];

const actions = {
  onChange: action('on change'),
  onSelect: action('on select')
};

storiesOf('AutocompleteInput', module).add('basic', () => (
  <AutocompleteInput attr="text" items={list} filter="" {...actions} />
));
