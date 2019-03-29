import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withPropsTable } from 'storybook-addon-react-docgen';

import { withMko } from './withMko';

const req = require.context('../lib/_stories', true, /\.js$/);

addDecorator(withA11y);
addDecorator(withPropsTable);
addDecorator(withMko);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
