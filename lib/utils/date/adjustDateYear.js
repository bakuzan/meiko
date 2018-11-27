const adjustDateYear = (date, adjustment) => {
  const d = new Date(date);
  return new Date(d.getFullYear() + adjustment, d.getMonth(), d.getDate());
};

export default adjustDateYear;
