export const PositionEnum = Object.freeze({
  left: 'left',
  center: 'center',
  right: 'right'
});

export const ViewOptionEnum = Object.freeze({
  DUMMY_DAY: 1,
  DAY: 2,
  MONTH: 3
});

// Use with event.key
export const EventCodes = Object.freeze({
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  Backspace: 'Backspace',
  Enter: 'Enter',
  Escape: 'Escape',
  Space: ' ',
  KeyQ: 'q',
  KeyS: 's',
  KeyG: 'g'
});

export const KeyCodes = Object.freeze({
  q: 81,
  backspace: 8,
  enter: 13,
  escape: 27,
  up: 38,
  down: 40,
  space: 32
});

export const CLOSE_KEYS = [
  KeyCodes.space,
  KeyCodes.enter,
  KeyCodes.escape,
  EventCodes.Space,
  EventCodes.Enter,
  EventCodes.Escape
];
export const OPEN_KEYS = [
  KeyCodes.space,
  KeyCodes.enter,
  EventCodes.Space,
  EventCodes.Enter
];
export const ARROW_KEYS = [
  EventCodes.ArrowUp,
  EventCodes.ArrowDown,
  EventCodes.ArrowLeft,
  EventCodes.ArrowRight
];
