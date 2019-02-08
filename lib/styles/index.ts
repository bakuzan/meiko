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

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
