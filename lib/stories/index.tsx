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

const testTheme = {
  primaryBackgroundColour: '#db7093',
  primaryColour: '#fff',
  primaryBackgroundColourHover: '#d14774',
  accentBackgroundColour: '#afeeee',
  accentColour: '#000',
  accentBackgroundColourHover: '#85e5e5',
  backgroundColour: 'inherit',
  colour: 'inherit',
  backgroundColourHover: '#eee'
};
export const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={testTheme}>{storyFn()}</ThemeProvider>
);
