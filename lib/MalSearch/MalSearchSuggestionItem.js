import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { Button } from '../Button';
import { isNumber } from '../_utils';

import '../AutocompleteInput/AutocompleteInput.scss';
import './MalSearch.scss';

const MalSearchSuggestionItem = ({
  activeSuggestion,
  index,
  attr,
  item,
  highlightMatch,
  selectAutocompleteSuggestion
}) => {
  const itemId = isNumber(item.id) ? item.id : item._id;
  const itemText = item[attr];
  const isActiveSuggestion = activeSuggestion === index;

  return (
    <li
      className={classNames(
        'autocomplete-suggestion',
        'mal-search-suggestion',
        {
          active: isActiveSuggestion
        }
      )}
    >
      <Button
        className="ripple"
        title={itemText}
        onClick={() => selectAutocompleteSuggestion(itemId)}
      >
        {!!item.image && (
          <img
            className={classNames('mal-search-suggestion-image')}
            src={item.image}
            alt="mal series cover"
          />
        )}
        {highlightMatch(itemText)}
        <span>{`(${item.type})`}</span>
      </Button>
    </li>
  );
};

MalSearchSuggestionItem.propTypes = {
  activeSuggestion: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  attr: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  highlightMatch: PropTypes.func.isRequired,
  selectAutocompleteSuggestion: PropTypes.func.isRequired
};

export default MalSearchSuggestionItem;
