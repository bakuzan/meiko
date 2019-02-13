import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import List from 'components/List';

const items = [
  'hello',
  'world',
  'this is a generic grid test',
  'with varying item text lengths',
  'remember this only does the basics',
  'the project usage will set',
  'the more',
  'specific settings'
];

function ListStory(props) {
  return (
    <List {...props}>
      {items.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </List>
  );
}

storiesOf('List', module)
  .addDecorator(withInfo)
  .add('basic', () => ListStory({}))
  .add('with shouldWrap', () => ListStory({ shouldWrap: true }))
  .add('with columns', () => ListStory({ columns: 3 }));
