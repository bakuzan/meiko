import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { Button } from '../Button';
import { isNumber } from '../../utils';
import { IAutocompleteOption } from 'types';
import './AutocompleteInput.scss';

export interface IAutocompleteSuggestionProps {
  activeSuggestion: number;
  index: number;
  attr: string;
  item: IAutocompleteOption;
  highlightMatch(text: string): JSX.Element;
  selectAutocompleteSuggestion(id: string | number): void;
}

const AutocompleteSuggestionItem = (
  props: IAutocompleteSuggestionProps
): JSX.Element => {
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
      className={classNames('autocomplete-suggestion', {
        active: isActiveSuggestion
      })}
    >
      <Button
        className="ripple"
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
