import React from 'react';
import { storiesOf } from '@storybook/react';

import Grid from '@/Grid';

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

function GridStory(props) {
  return (
    <Grid items={items} {...props}>
      {(item, index) => {
        return (
          <li key={index} className="mko-grid__item">
            {item}
          </li>
        );
      }}
    </Grid>
  );
}

storiesOf('Grid', module)
  .add('basic', () => GridStory({}))
  .add('with no items', () => GridStory({ items: [] }))
  .add('with no items and custom text', () =>
    GridStory({ items: [], noItemsText: 'Nothing to see here, move along.' })
  )
  .add('with custom colums', () => GridStory({ className: 'mko-grid--test' }))
  .add('with custom colums and equal row heights', () =>
    GridStory({ className: 'mko-grid--test_equal-rows' })
  );
