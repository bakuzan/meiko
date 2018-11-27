import { Strings } from 'constants';
import parseIfInt from './parseIfInt';

const getEventValue = ({ type, checked, value }) =>
  type === Strings.checkbox
    ? checked
    : type === Strings.date || type === Strings.text
      ? value
      : parseIfInt(value);

export default getEventValue;
