const getFirstDateOfMonth = (date) => {
  const d = new Date(date);
  d.setDate(1);
  return d;
};

export default getFirstDateOfMonth;
