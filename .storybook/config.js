import * as React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { ThemeProvider } from 'styles';

const themeOne = {
  baseBackground: '#ffffff',
  baseBackgroundHover: '#d9d9d9',
  baseColour: '#000000',
  colour: '#850512',
  contrast: '#7e7e86',
  anchorColour: '#ce414a',
  anchorColourHover: '#e1e3ef',
  primaryBackground: '#850512',
  primaryBackgroundHover: '#cf081c',
  primaryColour: '#e1e3ef',
  accentBackground: 'palevioletred',
  accentBackgroundHover: 'pink',
  accentColour: '#fff'
};

export const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={themeOne}>{storyFn()}</ThemeProvider>
);

addDecorator(checkA11y);
addDecorator(ThemeDecorator);
addParameters({ info: { inline: false } });

const req = require.context('../lib/stories', true, /\.tsx$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
