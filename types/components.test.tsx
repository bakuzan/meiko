import * as React from 'react';

import {
  Alert,
  AppInformation,
  AutocompleteInput,
  AutocompleteInputSuggestionItem,
  Button,
  withButtonisation,
  ChipListInput,
  ClearableInput,
  Input,
  DateSelector,
  DateSelectorCalendar,
  Dialog,
  DropdownMenu
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

withButtonisation(AutocompleteInput);
withButtonisation(AutocompleteInputSuggestionItem);
withButtonisation(Button);

<ChipListInput
  name="typings"
  attr="text"
  chipsSelected={[]}
  chipOptions={[]}
  updateChipList={() => null}
/>;

<ClearableInput label="Testing" />;
<Input />;

<DateSelector id="unique" value="2019-09-18" onChange={() => null} />;
<DateSelectorCalendar id="unique" selected="2019-09-01" />;

<Dialog isOpen={false} name="popup">
  Something that can pass as children.
</Dialog>;

<DropdownMenu align="left">Muh dropdown</DropdownMenu>;
<DropdownMenu align="center">
  {() => `Dropdown, but render props!`}
</DropdownMenu>;
