const setTimeForDate = (h, m, s) => (date) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m, s);
};

export default setTimeForDate;
