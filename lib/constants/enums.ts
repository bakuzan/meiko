interface IKeyCodes {
  q: number;
  backspace: number;
  enter: number;
  escape: number;
  up: number;
  down: number;
  space: number;
}

const keyCodes: IKeyCodes = {
  q: 81,
  backspace: 8,
  enter: 13,
  escape: 27,
  up: 38,
  down: 40,
  space: 32
};

const CLOSE_KEYS = [keyCodes.escape, keyCodes.enter];
const OPEN_KEYS = [keyCodes.space, keyCodes.enter];

export default {
  keyCodes,
  CLOSE_KEYS,
  OPEN_KEYS
};
