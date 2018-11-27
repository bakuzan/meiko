const getWeekExtreme = (check) => (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + check(day);
  d.setDate(diff);
  return d;
};

export default getWeekExtreme;
