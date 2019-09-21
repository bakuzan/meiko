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
  Logo,
  MultiSelect,
  NewTabLink,
  Portal,
  RadioButton,
  RadioToggle,
  RatingControl,
  RequestIndicator,
  SelectBox,
  Sidebar,
  Tabs,
  Container,
  View,
  TagChip,
  TagCloudSelector,
  Toaster,
  Tickbox,
  Tooltip,
  TabTrap
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

<Dialog
  isOpen={false}
  name="popup"
  tabTrapProps={{
    firstId: 'test',
    lastId: 'lastTest',
    onDeactivate: () => null
  }}
>
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

const Test = () => <li></li>;
<Grid items={[]}>{() => <li></li>}</Grid>;
<Grid items={[]}>{() => <Test />}</Grid>;

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

<MultiSelect id="test" values={[1, 2, 3]} options={[]} />;
<MultiSelect id="test" values={['a', 'b', 'c']} options={[]} />;

<NewTabLink href="/url">my link</NewTabLink>;

<Portal querySelector="#test">
  <div></div>
</Portal>;

<RadioButton id="test" name="test" value="true" onChange={() => null} />;
<RadioToggle label="Testing" checked={true} onChange={() => null} />;

<RatingControl id="rating" value={5} />;
<RatingControl id="rating" value={'5'} />;

<RequestIndicator hide={false} requestInFlight={true} />;

<SelectBox options={[]} />;
<SelectBox>
  <option value={1}>1</option>
</SelectBox>;
<SelectBox>{(op) => <option value={op.value}>{op.text}</option>}</SelectBox>;

<Sidebar
  items={[]}
  isCollapsed={false}
  isHidden={false}
  toggleCollapse={() => null}
  close={() => null}
/>;

<Tabs.Container>
  <Tabs.View name="first">
    <div></div>
  </Tabs.View>
  <Tabs.View name="second">{() => <div></div>}</Tabs.View>
  {false && (
    <Tabs.View name="third">
      <div></div>
    </Tabs.View>
  )}
</Tabs.Container>;
<Container>
  {false && (
    <View name="only one">
      <div></div>
    </View>
  )}
</Container>;

<TabTrap isActive={true} firstId="test" lastId="testLast"></TabTrap>;

<TagChip data={{ id: 1, name: 'test' }} />;

<TagCloudSelector tagOptions={[{ id: 1, name: 'test' }]} />;

<Tickbox id="test" checked={true} readOnly />;

<Toaster />;

<Tooltip text="Tooltip text">
  <div>something here</div>
</Tooltip>;
<Tooltip
  text="Tooltip text"
  isEnabled={true}
  delay={1000}
  highlight
  allowWrapping={false}
>
  <div>something here</div>
</Tooltip>;
