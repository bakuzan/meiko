export enum PositionEnum {
  Left = 'left',
  Right = 'right',
  Center = 'center'
}

export enum ViewOptionEnum {
  DUMMY_DAY = 1,
  DAY = 2,
  MONTH = 3
}

export enum KeyCodes {
  q = 81,
  backspace = 8,
  enter = 13,
  escape = 27,
  up = 38,
  down = 40,
  space = 32
}

export const CLOSE_KEYS = [KeyCodes.escape, KeyCodes.enter];
export const OPEN_KEYS = [KeyCodes.space, KeyCodes.enter];
