import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AutocompleteInput from 'components/AutocompleteInput';

const list = [
  { id: 5, text: 'Bat' },
  { id: 6, text: 'Cat' },
  { id: 7, text: 'Dingo' },
  { id: 8, text: 'Earwig' },
  { id: 9, text: 'Frog' }
];

const actions = {
  onChange: action('on change'),
  onSelect: action('on select')
};

storiesOf('AutocompleteInput', module).add('basic', () => (
  <AutocompleteInput attr="text" items={list} filter="" {...actions} />
));
