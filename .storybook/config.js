import * as React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { GlobalBaseStyle } from 'styles';

export const AppDecorator = (storyFn) => (
  <React.Fragment>
    <GlobalBaseStyle />
    {storyFn()}
  </React.Fragment>
);

addDecorator(checkA11y);
addDecorator(AppDecorator);
addParameters({ info: { inline: false } });

const req = require.context('../lib/stories', true, /\.tsx$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
