import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import AutocompleteInput from 'components/AutocompleteInput/AutocompleteInput';
import Loaders from 'components/Loaders';
import MalSearchSuggestionItem from './MalSearchSuggestionItem';

import {
  getEventValue,
  getTimeoutSeconds,
  debounce,
  capitalise
} from 'utils/common';
import MeikoFetch from 'utils/fetch';
import Urls from 'constants/urls';
import './MalSearch.css';

const getFilters = props => ({
  title: props.search,
  id: props.itemId,
  malId: props.id
});

const checkIfItemExistsAlready = query => props =>
  MeikoFetch(`${Urls.graphql.base}${query(getFilters(props))}`);

const searchMyAnimeList = type => search =>
  MeikoFetch(Urls.build(Urls.malSearch, { type, search }));

const Errors = {
  failed: () => 'Mal Search failed to get a response.',
  missing: type => `Mal Search failed to find the ${type}.`,
  exists: type => `${capitalise(type)} already exists.`
};

const initialState = {
  results: [],
  isFirstQuery: true,
  isFetching: false,
  hasSelected: false,
  error: null
};

class MalSearch extends Component {
  constructor(props) {
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

  async componentDidMount() {
    if (!this.props.id) return;

    const response = await this.queryMal(this.props.search);
    if (!response) return this.setState({ error: Errors.failed });

    const item = response.find(x => x.id === this.props.id);
    if (!item) return this.setState({ error: Errors.missing });

    this.props.selectMalItem(item);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.hasSelected !== this.state.hasSelected ||
      this.props.search !== prevProps.search
    ) {
      if (!!this.props.search) this.fetchMalResults();
      if (!this.props.search) this.setState(initialState);
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
    const alreadyExists = response.data && response.data.alreadyExists;
    const results = await this.queryMal(this.props.search);

    const error = !results
      ? Errors.failed
      : alreadyExists ? Errors.exists : null;

    if (!this.timer) return;
    this.setState({
      alreadyExists,
      results,
      error,
      isFetching: false,
      isFirstQuery: false
    });
  }

  selectAutocompleteSuggestion(selectedId) {
    const item = this.state.results.find(x => x.id === selectedId);
    this.props.selectMalItem(item);
    this.setState({ hasSelected: !!item });
  }

  handleMalSearch(event) {
    const search = getEventValue(event.target);
    this.props.onUserInput(event);
    if (!search) return this.selectAutocompleteSuggestion(null);
  }

  render() {
    const { type, search } = this.props;
    const malSearchClasses = classNames('mal-search-container', {
      fresh: this.state.isFirstQuery,
      fetching: this.state.isFetching,
      selected: this.state.hasSelected,
      exists: this.state.alreadyExists
    });

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
        />
        <span className="mal-search-messages">
          {!!this.state.error && this.state.error(type)}
        </span>
        {this.state.isFetching && <Loaders.LoadingSpinner size="control" />}
      </div>
    );
  }
}

MalSearch.propTypes = {
  id: PropTypes.number,
  itemId: PropTypes.string,
  type: PropTypes.string.isRequired,
  search: PropTypes.string,
  onUserInput: PropTypes.func.isRequired,
  selectMalItem: PropTypes.func.isRequired,
  asyncCheckIfExists: PropTypes.func
};

export default MalSearch;
