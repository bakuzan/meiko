import fetchMock from 'fetch-mock';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { MalSearch } from '../index';

const actions = {
  onUserInput: action('user input'),
  selectMalItem: action('selected item')
};

const payload = [
  {
    id: 1,
    title: 'Cowboy Bebop',
    type: 'TV',
    episode: 24,
    status: 2,
    image: ''
  }
];

storiesOf('MalSearch', module).add('basic', () => {
  fetchMock
    .restore()
    .getOnce('http://localhost:7200/api/mal-search/anime?search=cow', payload)
    .catch((...ttt) => payload);

  return <MalSearch type="anime" id={1} search="cowb" {...actions} />;
});
