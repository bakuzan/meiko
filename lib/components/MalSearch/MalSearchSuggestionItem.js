import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React from 'react';

import { Button } from 'components/Button/Button';
import { isNumber } from 'utils/common';
import autocompleteStyles from 'components/AutocompleteInput/AutocompleteInput.scss';
import malSearchStyles from './MalSearch.scss';

const styles = { ...autocompleteStyles, ...malSearchStyles };
const cx = classNames.bind(styles);

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
      className={cx('autocomplete-suggestion', 'mal-search-suggestion', {
        active: isActiveSuggestion
      })}
    >
      <Button
        className="ripple"
        title={itemText}
        onClick={() => selectAutocompleteSuggestion(itemId)}
      >
        {!!item.image && (
          <img
            className={cx('mal-search-suggestion-image')}
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
