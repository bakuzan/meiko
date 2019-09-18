import * as React from 'react';

export interface DateSelectorProps {
  id: string;
  value: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  afterDate?: string;
  beforeDate?: string;
  isFlat?: boolean;
  onChange: (date: string, name: string, hasError: boolean) => void;
}

declare class DateSelector extends React.Component<DateSelectorProps, any> {}

export default DateSelector;
