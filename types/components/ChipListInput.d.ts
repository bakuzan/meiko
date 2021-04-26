import * as React from 'react';

export interface ChipListOption {
  id: number | string;
  [key: string]: any;
}

export interface ChipListInputProps {
  id?: string;
  label?: string;
  attr: string;
  name: string;
  chipsSelected: ChipListOption[];
  chipOptions: ChipListOption[];
  createNewMessage?: string;
  menuClassName?: string;
  tagClassName?: string;
  updateChipList: (name: string, list: ChipListOption[]) => void;
  createNew?: (payload: { [key: string]: string }, name: string) => void;
}

declare class ChipListInput extends React.Component<ChipListInputProps, any> {}

export default ChipListInput;
