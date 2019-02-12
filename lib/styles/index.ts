import * as styledComponents from 'styled-components';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<any>;

const GlobalBaseStyle = createGlobalStyle`
  body {
    --app-font-size: 16px;
    --app-font-family: 'Roboto mono', 'Lucida Console', 'Courier New', monospace;

    margin: 0;
    padding: 0;
    font-family: var(--app-font-family);
    font-size: var(--app-font-size);
  }
  button {
    font-family: var(--app-font-family);
    font-size: var(--app-font-size);
  }
  input,
  select {
    background-color: inherit;
  }
`;

export { css, createGlobalStyle, keyframes, ThemeProvider, GlobalBaseStyle };
export default styled;
