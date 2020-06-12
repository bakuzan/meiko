export interface CountableChip {
  count: number;
  [key: string]: any;
}

export interface ChipSizeOptions {
  min?: number;
  max?: number;
}

declare function getChipSize(
  chips: CountableChip[],
  count: number,
  opts?: ChipSizeOptions
): number;

export default getChipSize;
