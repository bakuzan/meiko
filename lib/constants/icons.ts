interface IIcons {
  tick: string;
  cross: string;
  pause: string;
  clockwise: string;
  link: string;
  editable: string;
  save: string;
  left: string;
  right: string;
  settings: string;
  calendar: string;
  info: string;
}

const Icons: IIcons = {
  tick: '\u2713', // 10003, // '\u2713',
  cross: '\u2573', // '\u274C',
  pause: '\u2223\u2223', // '\u23F8', // 9208, // '\u23F8',
  clockwise: '\uD83D\uDD01', // 10227, // '\u27F3'
  link: '\uD83D\uDD17',
  editable: '\u270E', // '\uD83D\uDD89',
  save: '\uD83D\uDCBE',
  left: '\u2039',
  right: '\u203A',
  settings: '\u2699',
  calendar: '\uD83D\uDCC5',
  info: '\uD83D\uDEC8'
};

export default Icons;
