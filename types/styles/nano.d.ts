import { NanoRenderer } from 'nano-css';
import { CSSLikeObject } from './CSSLikeObject';

export const nano: NanoRenderer;

export const sheet: (style: CSSLikeObject) => CSSLikeObject;
