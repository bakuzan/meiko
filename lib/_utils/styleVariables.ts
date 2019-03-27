import { lighten, darken } from 'ayaka/palette';

// TODO delete _styles when rewrite done

// Shades
const grey80 = '#ccc';
const grey40 = '#666';

// Colours
const mostlyBlue = '#0000ee';

// Usages
export const anchorColour = mostlyBlue;
export const anchorColourHover = lighten(15, mostlyBlue); // '#3c3cff'

export const disabledBackground = grey80;
export const disabledColour = grey40;

// Re-exports
export { lighten, darken };
