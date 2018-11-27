import startOfDay from './startOfDay';

const getDatesAsMsAtMidnight = (...dates) =>
  dates.map((d) => startOfDay(new Date(d)).getTime());

export default getDatesAsMsAtMidnight;
