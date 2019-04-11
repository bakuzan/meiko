import { lighten, darken } from 'ayaka/palette';

// TODO delete styles when rewrite done

// Shades
const white = '#fff';
const grey94 = '#efefef';
const grey80 = '#ccc';
const grey40 = '#666';
const blackSmokey = '#100c08';
const black = '#000';

// Colours START
const blue = '#00f';
const cyan = '#0ff';
const green = '#0f0';
const mostlyBlue = '#0000ee';
const orange = '#ff9900';
const red = '#f00';

const darkViolet = '#674ea7';

const gold = '#ffcc00';
const silver = '#cccccc';
const bronze = '#cc6633';

// Colours END
// Usages
export const anchorColour = mostlyBlue;
export const anchorColourHover = lighten(15, mostlyBlue); // '#3c3cff'

export const disabledBackground = grey80;
export const disabledColour = grey40;

// Component vars
export const calendarViewShiftButtonBackground = white;
export const calendarSelectedDayBackground = darkViolet;
export const calendarSelectedDayColour = white;
export const calendarButtonBorderColour = grey94;

export const dateSelectorErrorMessageColour = red;

export const dropdownMenuBackground = white;

export const fileUploaderBorderColour = grey80;
export const fileUploaderBorderColourFocused = black;

export const headerHeight = '50px';

export const spinnerColour1 = red;
export const spinnerColour2 = green;
export const spinnerColour3 = blue;
export const spinnerColour4 = red;

export const sidebarWidthOpen = '200px';
export const sidebarWidthCollapsed = '50px';

export const tabControlBorderColour = grey80;
export const tabControlBorderBottomColour = white;

// Rating Colours
export const ratingColours = new Map([
  ['low', blackSmokey],
  ['average', bronze],
  ['good', silver],
  ['great', gold]
]);

// UI Messaging
const infoColour = cyan;
const successColour = green;
const alertColour = orange;
const dangerColour = red;
export const uiMessaging = new Map([
  [
    'success',
    {
      background: successColour,
      colour: black,
      icon: '\u2713'
    }
  ],
  [
    'error',
    {
      background: dangerColour,
      colour: white,
      icon: '\u0021'
    }
  ],
  [
    'warning',
    {
      background: alertColour,
      colour: black,
      icon: '\u26a0'
    }
  ],
  [
    'info',
    {
      background: infoColour,
      colour: black,
      icon: '\u2139'
    }
  ]
]);

// Z Indexes
export const zIndexes = new Map([
  ['wafer', 1],
  ['above-siblings', 10],
  ['above-backdrop', 25],
  ['header', 50],
  ['popover', 100],
  ['menu', 250],
  ['alert', 1000]
]);

// Re-exports
export { lighten, darken };
