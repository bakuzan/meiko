export interface SelectBoxOption {
  value: string | number | string[];
  text: string;
}

export interface SelectBoxProps extends React.HTMLProps<HTMLSelectElement> {
  containerClassName?: string;
  text?: string;
  options?: SelectBoxOption[];
  children?:
    | React.ReactNode
    | React.ReactNode[]
    | ((option: SelectBoxOption) => React.ReactNode);
}

declare const SelectBox: React.SFC<SelectBoxProps>;

export default SelectBox;
