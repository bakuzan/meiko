import * as styledComponents from 'styled-components';

export interface ITheme {
  baseBackground: string;
  baseBackgroundHover: string;
  baseColour: string;
  colour: string;
  contrast: string;
  anchorColour: string;
  anchorColourHover: string;
  primaryBackground: string;
  primaryBackgroundHover: string;
  primaryColour: string;
  accentBackground: string;
  accentColour: string;
  accentBackgroundHover: string;
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ITheme>;

const GlobalBaseStyle = createGlobalStyle`
  --app-font-size: 16px;
  --app-font-family: 'Roboto mono', 'Lucida Console', 'Courier New', monospace;

  body {
    margin: 0;
    padding: 0;
    font-family: var(--app-font-family);
    font-size: var(--app-font-size);
  }
  button {
    font-family: var(--app-font-family);
    font-size: var(--app-font-size);
  }
`;

export { css, createGlobalStyle, keyframes, ThemeProvider, GlobalBaseStyle };
export default styled;
