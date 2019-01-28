import Icons from 'constants/icons';

import * as col from './colours';

// Screen Variables

export const screen_xs = 480;
export const screen_sm = 768;
export const screen_md = 992;
export const screen_lg = 1200;

// Prevent overlapping
export const screenMax_xs = screen_sm - 1;
export const screenMax_sm = screen_md - 1;
export const screenMax_md = screen_lg - 1;

export const media = new Map([
  ['xs', `@media (max-width: ${screenMax_xs}px)`],
  ['sm', `@media (min-width: ${screen_sm}) and (max-width: ${screenMax_sm}px)`],
  ['md', `@media (min-width: ${screen_md}) and (max-width: ${screenMax_md}px)`],
  ['lg', `@media (min-width: ${screen_lg}px)`]
]);

// Unit helpers:
export const pixel = 'px';
export const percent = '%';

// z-index
export const zIndexes = new Map([
  ['wafer', 1],
  ['above-siblings', 10],
  ['header', 50],
  ['popover', 100],
  ['menu', 250],
  ['alert', 1000]
]);

// UI messaging
const infoColour = col.cyan;
const successColour = col.green;
const alertColour = col.orange;
const dangerColour = col.red;
export const uiMessaging = new Map([
  [
    'success',
    {
      background: successColour,
      colour: '#000',
      icon: Icons.tick
    }
  ],
  [
    'error',
    {
      background: dangerColour,
      colour: '#fff',
      icon: Icons.error
    }
  ],
  [
    'warning',
    {
      background: alertColour,
      colour: '#000',
      icon: Icons.warning
    }
  ],
  [
    'info',
    {
      background: infoColour,
      colour: '#000',
      icon: Icons.info // '\u2139'
    }
  ]
]);

export const darkenAmount = '5%';

// Component Variables
export const anchorColour = col.mostlyBlue;
export const anchorColourHover = col.mostlyBlue; // lighten(col.mostlyBlue, darkenAmount * 3);

// //TEXT:
// $font-sizes: 10 12 14 15 16 18 20 22 24 25 28 30 32 34 35 36 38 40 42;
// $font-weights: bold bolder normal lighter;
// $text-align: left right center start end;
// $cursors: default none pointer move help;
// $transformations: uppercase lowercase none capitalize full-width;
// $text-decorations: underline overline none line-through;

// //BOX MODEL:
// $percentage-sizes: 10 15 20 25 30 33 40 50 60 66 70 75 80 90 95 100;
// $positions: absolute relative fixed;
// $boxing: 0 2 5 10 15 20 25 30 35 40 45 50 55;

// //Display:
// $displays: inline inline-block inline-flex flex list-item block none;

// //Overflow:
// $overflow: auto hidden scroll visible;

// //Floats:
// $floats: left right none;

// Component Variables
// $button-icon--hover-darken-percentage: $darken-amount;
// $calendar--button-border-colour: $grey94;
// $calendar--selected-day-background-colour: $dark-violet;
// $calendar--selected-day-font-colour: $white;
// $calendar--view-shift-button-colour: $white;
// $date-selector--error-message-colour: $red;
// $header--height: 50px;
// $sidebar--width-open: 200px;
// $sidebar--width-collapsed: 50px;
// $tag-chip--font-size--default: 1em;
// Colours
// $primary-background: $black;
// $primary-colour: $black;
// $primary-colour-contrast: $grey80;
// $accent-background: $grey80;
// $accent-colour: $grey80;
// $accent-colour-contrast: $black;
// $spinner-colour-one: $red;
// $spinner-colour-two: $green;
// $spinner-colour-three: $blue;
// $spinner-colour-four: $red;
