import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { Button } from './Button';
import { isNumber } from './utils';

import styles from './styles/AutocompleteInput';

const AutocompleteSuggestionItem = (props) => {
  const {
    activeSuggestion,
    index,
    attr,
    item,
    highlightMatch,
    selectAutocompleteSuggestion
  } = props;
  const itemId = isNumber(item.id) ? item.id : item._id;
  const itemText = item[attr];
  const isActiveSuggestion = activeSuggestion === index;

  return (
    <li
      className={classNames(
        'autocomplete-suggestion',
        {
          'autocomplete-suggestion--active': isActiveSuggestion
        },
        styles.suggestion
      )}
    >
      <Button
        className="autocomplete-suggestion__button"
        title={itemText}
        onClick={() => selectAutocompleteSuggestion(itemId)}
      >
        {highlightMatch(itemText)}
      </Button>
    </li>
  );
};

AutocompleteSuggestionItem.propTypes = {
  activeSuggestion: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  attr: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  highlightMatch: PropTypes.func.isRequired,
  selectAutocompleteSuggestion: PropTypes.func.isRequired
};

export default AutocompleteSuggestionItem;
