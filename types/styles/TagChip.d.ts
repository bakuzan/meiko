declare module 'meiko/styles/TagChip' {
  interface CSSLikeObject {
    [selector: string]: any | CSSLikeObject;
  }

  const TagChipStyle: CSSLikeObject;

  export = TagChipStyle;
}
