import { Strings } from 'constants';

const getDayName = (date) => Strings.dayNames[new Date(date).getDay()];

export default getDayName;
