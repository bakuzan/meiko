import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Grid from 'components/Grid';
import './grid-story.scss';

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
  .addDecorator(withInfo)
  .add('basic', () => GridStory({}))
  .add('with no items', () => GridStory({ items: [] }))
  .add('with no items and custom text', () =>
    GridStory({ items: [], noItemsText: 'Nothing to see here, move along.' })
  )
  .add('with custom colums', () => GridStory({ className: 'mko-grid--test' }));
