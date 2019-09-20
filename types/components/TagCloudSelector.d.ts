import * as React from 'react';
import { Chip } from './TagChip';

export interface TagCloudSelectorProps {
  name?: string;
  className?: string;
  tagClass?: string;
  tagOptions: Chip[];
  selectedTags?: string[] | number[];
  sizeRelativeToCount?: boolean;
  onSelect?: (selected: string[] | number[], name?: string) => void;
}

declare class TagCloudSelector extends React.Component<
  TagCloudSelectorProps,
  any
> {}

export default TagCloudSelector;
