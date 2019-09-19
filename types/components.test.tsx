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
  DropdownMenu,
  FileUploader,
  Form,
  FormControls,
  Grid,
  Header,
  Image,
  ImageSelector,
  List,
  SimpleLoading,
  Loading,
  LoadableContent,
  LoadingBouncer,
  LoadingSpinner,
  SelectBox,
  Logo
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

<FileUploader name="files" onFileSelect={() => null} />;

<Form name="testForm">
  <input type="text" value="" />
</Form>;

<FormControls.ErrorBlock>Something is wrong.</FormControls.ErrorBlock>;
<FormControls.ClearableInput containerClassName="Did it work?" label="Text" />;
<FormControls.SelectBox value={1} disabled={true}>
  <option value={1}>1</option>
</FormControls.SelectBox>;

<Grid items={[]}>{() => <li></li>}</Grid>;

<Header
  leftAlignTitle={true}
  navLeft={<div></div>}
  navRight={<div></div>}
  title="sdfsdfsdf"
/>;

<Image src="" alt="" isLazy={false} intersectionMargin="" />;
<ImageSelector
  uploaderClassName=""
  onChange={() => null}
  onError={() => null}
/>;

<List shouldWrap columns={3}>
  <div>dfsdasdasda</div>
</List>;

<SimpleLoading pastDelay={false} />;
<Loading pastDelay={false} error={new Error()} timedOut={false} />;

<LoadableContent isFetching={true}>
  <div>dfgsdgsergs rsrgs hs</div>
</LoadableContent>;

<LoadingBouncer className="" />;
<LoadingSpinner size="test" />;

<Logo text="LOGO" />;

<SelectBox options={[]} />;
<SelectBox>
  <option value={1}>1</option>
</SelectBox>;
<SelectBox>{(op) => <option value={op.value}>{op.text}</option>}</SelectBox>;
