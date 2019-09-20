import { FormEvent } from 'react';

export interface RadioToggleProps {
  checked: boolean;
  className?: string;
  icons?: string[];
  label: string;
  onChange: (checked: boolean, name: string) => void;
  [key: string]: any;
}

declare const RadioToggle: React.SFC<RadioToggleProps>;

export default RadioToggle;
