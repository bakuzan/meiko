import * as React from 'react';

export interface AutocompleteInputProps {
  id?: string;
  label?: string;
  attr?: string;
  items: any[];
  filter: string;
  disableLocalFilter?: boolean;
  menuClassName?: string;
  clearableInputProps?: React.HTMLProps<HTMLInputElement> & {
    clearInputButtonClass?: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (id: string | number) => void;
  suggestionTemplate?: (props: any) => React.ReactElement;
  noSuggestionsItem: React.ReactElement;
}

declare class AutocompleteInput extends React.Component<
  AutocompleteInputProps,
  any
> {}

export default AutocompleteInput;
