import * as styledComponents from 'styled-components/macro';

const { default: styled, css, createGlobalStyle, keyframes } = styledComponents;

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

export { css, createGlobalStyle, keyframes, GlobalBaseStyle };
export default styled;
