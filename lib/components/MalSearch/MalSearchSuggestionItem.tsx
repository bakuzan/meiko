import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { Button } from '../Button';
import { isNumber } from '../../utils';
import { IAutocompleteOption } from 'types';

import { MalSuggestion, MalSuggestionImage } from './styles';

interface IMalAutocompleteOption extends IAutocompleteOption {
  image?: string;
  type: string;
}
interface IMalSearchSuggestionProps {
  activeSuggestion: number;
  index: number;
  attr: string;
  item: IMalAutocompleteOption;
  highlightMatch(text: string): JSX.Element;
  selectAutocompleteSuggestion(id: string | number): void;
}

const MalSearchSuggestionItem = ({
  activeSuggestion,
  index,
  attr,
  item,
  highlightMatch,
  selectAutocompleteSuggestion
}: IMalSearchSuggestionProps) => {
  const itemId = isNumber(item.id) ? item.id : item._id;
  const itemText = item[attr];
  const isActiveSuggestion = activeSuggestion === index;

  return (
    <MalSuggestion
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
          <MalSuggestionImage
            className={classNames('mal-search-suggestion-image')}
            src={item.image}
            alt={`MyAnimeList ${itemText || 'series'} cover`}
          />
        )}
        {highlightMatch(itemText)}
        <span>{`(${item.type})`}</span>
      </Button>
    </MalSuggestion>
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
