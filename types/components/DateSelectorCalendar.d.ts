import * as React from 'react';

export interface CalendarProps {
  id: string;
  selected: string;
  afterDate?: string | number;
  beforeDate?: string | number;
  isFlat?: boolean;
  disabled?: boolean;
  onSelect?: (date: string) => void;
  onClose?: () => void;
}

declare class Calendar extends React.Component<CalendarProps, any> {}

export default Calendar;
