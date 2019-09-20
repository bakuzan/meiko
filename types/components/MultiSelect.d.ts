import * as React from 'react';

import { SelectBoxOption } from './SelectBox';

export interface MultiSelectProps {
  listClassName?: string;
  name?: string;
  id: string;
  placeholder?: string;
  label?: string;
  values: string[] | number[];
  options: SelectBoxOption[];
  onUpdate?: (values: string[] | number[], name?: string) => void;
}

declare class MultiSelect extends React.Component<MultiSelectProps, any> {}

export default MultiSelect;
