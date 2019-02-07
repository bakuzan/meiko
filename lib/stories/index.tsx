import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';

import Example from 'components/Example';

import '../styles/index.scss';

storiesOf('Example', module)
  .add('basic', () => <Example />)
  .add('custom message', () => (
    <Example message="The css is not being loaded" />
  ));

export const storyStyle = {
  maxWidth: '300px',
  margin: 'auto',
  marginTop: '20px'
};

const styles = { display: 'flex', justifyContent: 'center', marginTop: '30px' };
export const CenterDecorator = (storyFn) => (
  <div style={styles}>{storyFn()}</div>
);

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
  primaryColour: '#e1e3ef'
};

export const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={themeOne}>{storyFn()}</ThemeProvider>
);
