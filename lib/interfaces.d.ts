export interface IAutocompleteOption {
  id?: string | number;
  _id?: string | number;
}

export interface IElementCoordinates {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export type IJSXChildren =
  | JSX.Element[]
  | JSX.Element
  | React.ReactText[]
  | React.ReactText;

export interface ISelectBoxOption {
  text: string;
  value: string | number;
}
