import { Strings } from 'constants';

const getMonthName = (date) => Strings.monthNames[new Date(date).getMonth()];

export default getMonthName;
