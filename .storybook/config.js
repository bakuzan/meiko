import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

const req = require.context('../lib/stories', true, /\.tsx$/);

addDecorator(withA11y);
addParameters({ info: { inline: false } });

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
