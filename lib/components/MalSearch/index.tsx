import * as PropTypes from 'prop-types';
import * as React from 'react';
import classNames from 'classnames';

import AutocompleteInput from '../AutocompleteInput';
import Loaders from '../Loaders';
import MalSearchSuggestionItem from './MalSearchSuggestionItem';

import {
  getEventValue,
  getTimeoutSeconds,
  debounce,
  capitalise,
  isArray,
  MeikoFetch
} from '../../utils';
import Urls from '../../constants/urls';
import { IAutocompleteOption } from 'types';
import './MalSearch.scss';

interface IMalSearchFilters {
  id: number | string;
  title: string;
  malId: number;
}
interface IMalSearchProps {
  id: number;
  itemId: string;
  type: string;
  search: string;
  menuClassName: string;
  onUserInput(e: Event): void;
  selectMalItem(item: IAutocompleteOption): void;
  asyncCheckIfExists?(filters: IMalSearchFilters): string;
}
interface IMalSearchState {
  results: IAutocompleteOption[];
  isFirstQuery: boolean;
  isFetching: boolean;
  hasSelected: boolean;
  alreadyExists: boolean;
  error?(type?: string): string;
}

const getFilters = (props: IMalSearchProps): IMalSearchFilters => ({
  title: props.search,
  id: props.itemId,
  malId: props.id
});

const hasMalError = (data) => !data || !data.success || !isArray(data);

const checkIfItemExistsAlready = (
  query: (filters: IMalSearchFilters) => string
) => (props: IMalSearchProps) => {
  const filters = getFilters(props);
  return MeikoFetch(`${Urls.graphql.base}${query(filters)}`);
};

const searchMyAnimeList = (type: string) => (search: string) =>
  MeikoFetch(Urls.build(Urls.malSearch, { type, search }));

const Errors = {
  failed: () => 'Mal Search failed to get a response.',
  missing: (type) => `Mal Search failed to find the ${type}.`,
  exists: (type) => `${capitalise(type)} already exists.`
};

const initialState: IMalSearchState = {
  results: [],
  isFirstQuery: true,
  isFetching: false,
  hasSelected: false,
  alreadyExists: false,
  error: null
};

class MalSearch extends React.Component<IMalSearchProps, IMalSearchState> {
  static propTypes = {
    id: PropTypes.number,
    itemId: PropTypes.string,
    type: PropTypes.string.isRequired,
    search: PropTypes.string,
    onUserInput: PropTypes.func.isRequired,
    selectMalItem: PropTypes.func.isRequired,
    asyncCheckIfExists: PropTypes.func,
    menuClassName: PropTypes.string
  };

  private timer = null;
  private queryMal = null;
  private checkIfExists = null;

  constructor(props: IMalSearchProps) {
    super(props);
    this.state = {
      ...initialState
    };

    this.timer = null;
    this.queryMal = searchMyAnimeList(props.type);
    this.checkIfExists = !!props.asyncCheckIfExists
      ? checkIfItemExistsAlready(props.asyncCheckIfExists)
      : () => Promise.resolve({});

    this.handleMalSearch = this.handleMalSearch.bind(this);
    this.selectAutocompleteSuggestion = this.selectAutocompleteSuggestion.bind(
      this
    );
  }

  componentDidMount() {
    if (!this.props.id) {
      return;
    }

    this.handleQueries();
  }

  componentDidUpdate(prevProps, prevState) {
    const hasSelectedChanged = prevState.hasSelected !== this.state.hasSelected;
    const hasSearchChanged = this.props.search !== prevProps.search;
    if (!hasSearchChanged && !hasSelectedChanged) {
      return;
    }

    if (this.props.search) {
      this.fetchMalResults();
    } else {
      this.setState(initialState);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  fetchMalResults() {
    this.timer = debounce(() => {
      this.setState({ isFetching: true }, this.handleQueries);
    }, getTimeoutSeconds(2));
  }

  async handleQueries() {
    const response = await this.checkIfExists(this.props);
    const alreadyExists = !!(response.data && response.data.alreadyExists);
    const results = await this.queryMal(this.props.search);

    const malError = hasMalError(results);
    const error = alreadyExists
      ? Errors.exists
      : malError
      ? Errors.failed
      : null;

    this.setState(
      {
        alreadyExists,
        results: !malError ? results : [],
        error,
        isFetching: false,
        isFirstQuery: false
      },
      () => {
        if (this.props.id && !this.state.hasSelected) {
          this.selectAutocompleteSuggestion(this.props.id);
        }
      }
    );
  }

  selectAutocompleteSuggestion(selectedId, forceRemove = false) {
    const item = this.state.results.find((x) => x.id === selectedId);
    if (forceRemove || item) {
      this.props.selectMalItem(item);
    }
    this.setState((prev) => ({
      hasSelected: !!item,
      error: !item ? Errors.missing : prev.error
    }));
  }

  handleMalSearch(event) {
    const search = getEventValue(event.target);
    this.props.onUserInput(event);
    if (!search) {
      return this.selectAutocompleteSuggestion(null, true);
    }
  }

  render() {
    const { type, search, menuClassName } = this.props;
    const malSearchClasses = classNames('mal-search-container', {
      fresh: this.state.isFirstQuery,
      fetching: this.state.isFetching,
      selected: this.state.hasSelected,
      exists: this.state.alreadyExists
    });
    const menuCompleteClasses = classNames('mal-results', menuClassName);
    const clearableInputClasses = {
      clearInputButtonClass: classNames('mal-clear-input')
    };

    return (
      <div className={malSearchClasses}>
        <AutocompleteInput
          attr="title"
          items={this.state.results}
          filter={search}
          onChange={this.handleMalSearch}
          onSelect={this.selectAutocompleteSuggestion}
          disableLocalFilter={true}
          suggestionTemplate={MalSearchSuggestionItem}
          menuClassName={menuCompleteClasses}
          clearableInputProps={clearableInputClasses}
        />
        <span className={classNames('mal-search-messages')}>
          {!!this.state.error && this.state.error(type)}
        </span>
        {this.state.isFetching && <Loaders.LoadingSpinner size="control" />}
      </div>
    );
  }
}

export default MalSearch;
