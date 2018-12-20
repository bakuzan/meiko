import { Strings } from '../../constants';

const getDayName = (date: string | number | Date) =>
  Strings.dayNames[new Date(date).getDay()];

export default getDayName;
