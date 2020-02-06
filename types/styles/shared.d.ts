import { CSSLikeObject } from './CSSLikeObject';

export const centerContents: CSSLikeObject;
export const forScreenReader: CSSLikeObject;
export const standardShadow: CSSLikeObject;

export const media: (
  breakpoints: string[],
  style: CSSLikeObject
) => CSSLikeObject;
