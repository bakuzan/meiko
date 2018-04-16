import { configure } from '@storybook/react';

const req = require.context('../lib/stories', true, /\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
