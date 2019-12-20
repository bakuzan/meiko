export interface CountableChip {
  count: number;
  [key: string]: any;
}

declare function getChipSize(chips: CountableChip[], count: number): number;

export default getChipSize;
