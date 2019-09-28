import React from 'react';
import { storiesOf } from '@storybook/react';

import { Icons } from '@/constants/index';

storiesOf('Icons', module).add('available icons list', () => {
  return (
    <div>
      <ul style={{ minWidth: 400, listStyleType: 'none' }}>
        {Object.keys(Icons).map((k) => (
          <li
            key={k}
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: `1px dashed`
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: `2px`
              }}
            >
              <strong>Name:&nbsp;</strong>
              {k}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: `2px`
              }}
            >
              <strong>Appereance:&nbsp;</strong>
              {Icons[k]}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});
