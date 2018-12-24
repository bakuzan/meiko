import { ReactElement } from 'react';
import { bool } from 'prop-types';

interface IAlert {
  id: string;
  type: string;
  message: string;
  detail: string;
}
interface IAlertProps {
  id: string;
  alerts: IAlert[];
  actions: {
    dismissAlertMessage(): void;
  };
  messageClassName: string;
}
interface IAlertState {
  expandedAlerts: Array<string | number>;
}

interface IAppInformationProps {
  branch: string;
  version: string;
}
interface IAppInformationState {
  hovered: boolean;
}

interface IAutocompleteOption {
  id?: string | number;
  _id?: string | number;
}
interface IAutocompleteInputProps {
  label: string;
  attr: string;
  items: IAutocompleteOption[];
  filter: string;
  disableLocalFilter: boolean;
  menuClassName: string;
  clearableInputProps: {
    className: string;
    clearInputButtonClass: string;
  };
  noSuggestionsItem: boolean;
  onChange(e: Event): void;
  onSelect(id: string | number): void;
  onKeyDown(e: Event): void;
  suggestionTemplate(): void;
}
interface IAutocompleteInputState {
  inUse: boolean;
  activeSuggestion: number;
}

interface IAutocompleteSuggestionProps {
  activeSuggestion: number;
  index: number;
  attr: string;
  item: IAutocompleteOption;
  highlightMatch(text: string): React.ReactElement<any>;
  selectAutocompleteSuggestion(id: string | number): void;
}

interface IBackdropProps {
  id: string;
  onClickOrKey(): void;
}

interface IButtonProps {
  className: string;
  type?: string;
  btnStyle: string;
  btnSize: string;
  link: boolean;
  rounded: boolean;
  depress: boolean;
  icon: string;
  children: JSX.Element;
  onClick(e: Event): void;
}

interface ICalendarProps {
  id: string;
  selected: string;
  afterDate: string;
  beforeDate: string;
  disabled: boolean;
  onSelect(date: string): void;
}
interface ICalendarState {
  viewDate: string;
  selectedDate: string;
  isMonthView: boolean;
}

interface IChipListItem {
  id: string | number;
  name?: string;
}
interface IChipListInputProps {
  label?: string;
  attr: string;
  name: string;
  chipsSelected: IChipListItem[];
  chipOptions: IChipListItem[];
  createNewMessage: string;
  menuClassName: string;
  tagClassName: string;
  updateChipList(name: string, list: IChipListItem[]): void;
  createNew(data: any, name: string): void;
}
interface IChipListInputState {
  readyRemoval: boolean;
}

interface IClearableInputProps {
  clearInputButtonClass: string;
  name: string;
  label: string;
  value: string | number;
  maxLength: number;
  onChange(e: Event): void;
  onKeyDown(e: Event): void;
}

interface IDateSelectorProps {
  name: string;
  value: string;
  label: string;
  required: boolean;
  disabled: boolean;
  afterDate: string;
  beforeDate: string;
  isFlat: boolean;
  onChange(date: string, name: string, hasError: boolean): void;
}
interface IDateSelectorState {
  displayCalendar: boolean;
  errorMessage: string;
}

interface IDialogProps {
  name: string;
  title: string;
  children: JSX.Element;
  actionText: string;
  isForm: boolean;
  hasBackdrop: boolean;
  hideCancel: boolean;
  getDialogRef(element: React.LegacyRef<HTMLDialogElement>): void;
  action(e: Event): void;
  onClose(): void;
}

interface IDropdownMenuProps {
  id: string;
  title: string;
  icon: string;
  portalTarget: string;
  align: PositionEnum;
  children: JSX.Element;
}
interface IDropdownMenuState {
  isDropdownOpen: boolean;
  position: IElementCoordinates;
}

interface IElementCoordinates {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

interface IFileUploaderProps {
  className: string;
  name: string;
  value: string;
  placeholder: string;
  onFileSelect(e: Event): void;
}

interface IFormProps {
  name: string;
  title: string;
  children: JSX.Element;
  submitOptions: {
    text: string;
    onSubmit(): void;
  };
  cancelOptions: {
    hide: boolean;
    onCancel(): void;
  };
}

interface IHeaderProps {
  id: string;
  title: string;
  leftAlignTitle: boolean;
  navLeft: JSX.Element;
  navRight: JSX.Element;
}

interface IImageSelectorProps {
  className: string;
  uploaderClassName: string;
  name: string;
  url: string;
  onChange(e: any): void;
  onError(error: IImageUploadError): void;
}
interface IImageSelectorState {
  imageFile: File;
  imageUrl: string;
  imageMessage: string;
}
interface IImageUploadError {
  error: string;
  message: string;
}

interface ILoadableContentProps {
  isFetching: boolean;
  spinnerSize: string;
  spinnerDelay: number;
}
interface ILoadableContentState {
  pastDelay: boolean;
}

interface ILoadingSpinnerProps {
  size: string;
}

interface IMalSearchFilters {
  title: string;
  id: number;
  malId: number;
}
interface IMalSearchProps {
  id: number;
  itemId: string;
  type: string;
  search: string;
  menuClassName: string;
  onUserInput(e: Event): void;
  selectMalItem(): void;
  asyncCheckIfExists(filters: IMalSearchFilters): void;
}
interface IMalSearchState {
  results: IAutocompleteOption[];
  isFirstQuery: boolean;
  isFetching: boolean;
  hasSelected: boolean;
  error: string;
}

interface IMalSearchSuggestionProps {
  activeSuggestion: number;
  index: number;
  attr: string;
  item: object;
  highlightMatch(text: string): JSX.Element;
  selectAutocompleteSuggestion(id: string | number): void;
}

interface IMultiSelectProps {
  listClassName: string;
  name: string;
  id: string;
  placeholder: string;
  label: string;
  values: Array<string | number>;
  options: ISelectBoxOption[];
  onUpdate(): void;
}
interface IMultiSelectState {
  isOpen: boolean;
}

interface IPortalProps {
  parentTag: string;
  querySelector: string;
}

interface IRadioButtonProps {
  name: string;
  label: string;
  value: string | number | boolean;
  checked: boolean;
  onSelect(e: Event): void;
}

interface IRatingControlProps {
  name: string;
  label: string;
  value: string | number | boolean;
  onChange(e: Event): void;
}

interface IRequestIndicatorProps {
  hide: boolean;
  requestInFlight: boolean;
}

interface ISelectBoxOption {
  text: string;
  value: string | number | boolean;
}
interface ISelectBoxProps {
  name: string;
  value: string | number | boolean;
  disabled: boolean;
  text: string;
  options: ISelectBoxOption[];
  onSelect(e: Event): void;
}

interface ISidebarLink {
  link: string;
  title: string;
  icon: string;
}
interface ISidebarProps {
  id: string;
  className: string;
  isHidden: boolean;
  isCollapsed: boolean;
  items: ISidebarLink[];
  customLinkTemplate(props: ISidebarLinkProps): void;
  toggleCollapse(e: Event): void;
  close(e: Event): void;
}
interface ISidebarLinkProps {
  data: ISidebarLink;
  onClick(e: Event): void;
}

interface ISvgLogoProps {
  id: string;
  text: string;
}

interface ITabContainerProps {
  className: string;
  tabsClassName: string;
  children: JSX.Element;
}
interface ITabContainerState {
  activeTab: string;
}
interface ITabViewProps {
  isActive: boolean;
  children: JSX.Element;
}

interface ITagCloudSelectorProps {
  name: string;
  className: string;
  tagClass: string;
  tagOptions: ITagOption[];
  selectedTags: number[];
  sizeRelativeToCount: boolean;
  onSelect(tags: any[], name: string): void;
}
interface ITagOption {
  count: number;
  name: string;
  id: string | number;
}
interface ITagChipProps {
  className: string;
  isActive: boolean;
  data: ITagOption;
  chipSize: string | number;
  onRemove(tag: ITagOption): void;
  onClick(tag: ITagOption): void;
}

interface ITickboxProps {
  name: string;
  checked: boolean;
  disabled: boolean;
  text: string;
  onChange(e: Event): void;
}

interface IToast {
  time?: number;
  type: string;
  title: string;
  message: string;
}
interface IToaster {
  popToast(toast: IToast): void;
}
interface IToasterState {
  stack: IToast[];
}
