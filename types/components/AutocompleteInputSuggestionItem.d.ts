export interface AutocompleteInputSuggestionItemProps {
  activeSuggestion: number;
  index: number;
  attr: string;
  item: {
    id: string | number;
    [key: string]: any;
  };
  highlightMatch: (text: string) => React.ReactElement;
  selectAutocompleteSuggestion: (id: string | number) => void;
}

declare const AutocompleteInputSuggestionItem: React.SFC<
  AutocompleteInputSuggestionItemProps
>;

export default AutocompleteInputSuggestionItem;
