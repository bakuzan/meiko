export interface Chip {
  id: string | number;
  name: string;
  count?: number;
}

export interface TagChipProps {
  className?: string;
  isActive?: boolean;
  data: Chip;
  chipSize?: number;
  onRemove?: (chip: Chip) => void;
  onClick?: (chip: Chip) => void;
}

declare const TagChip: React.SFC<TagChipProps>;

export default TagChip;
