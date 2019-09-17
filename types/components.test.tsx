import * as React from 'react';

import {
  Alert,
  AppInformation,
  AutocompleteInput,
  AutocompleteInputSuggestionItem,
  Button
} from 'meiko';

<Alert
  messageClassName="name"
  actions={{ dismissAlertMessage: (_id) => {} }}
  alerts={[]}
></Alert>;

<AppInformation branch="test" version="0.0.0" />;

<AutocompleteInput
  label=""
  attr=""
  items={[]}
  filter=""
  disableLocalFilter
  menuClassName="name"
  clearableInputProps={{ id: 'unique', clearInputButtonClass: 'input' }}
  onSelect={() => {}}
  suggestionTemplate={(a) => <div></div>}
  noSuggestionsItem={<div></div>}
></AutocompleteInput>;

<AutocompleteInputSuggestionItem
  attr=""
  activeSuggestion={0}
  index={1}
  highlightMatch={() => <div></div>}
  item={{ id: 44 }}
  selectAutocompleteSuggestion={(_id) => {}}
></AutocompleteInputSuggestionItem>;

<Button btnSize="small" btnStyle="primary" icon="" link>
  Hello world
</Button>;
