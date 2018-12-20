import { Strings } from '../../constants';

const getMonthName = (date: string | number | Date) =>
  Strings.monthNames[new Date(date).getMonth()];

export default getMonthName;
