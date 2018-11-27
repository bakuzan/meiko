const adjustDateMonth = (date, adjustment) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + adjustment, d.getDate());
};

export default adjustDateMonth;
