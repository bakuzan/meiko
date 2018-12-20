import { Strings } from '../constants';
import parseIfInt from './parseIfInt';

const getEventValue = ({ type, checked, value }): string | number | boolean => {
  return type === Strings.checkbox
    ? checked
    : type === Strings.date || type === Strings.text
      ? value
      : parseIfInt(value);
};

export default getEventValue;
