const checkIfDatePartsMatch = (d1, d2) => {
  const dx = new Date(d1);
  const dy = new Date(d2);
  return {
    year: dx.getFullYear() === dy.getFullYear(),
    month: dx.getMonth() === dy.getMonth(),
    date: dx.getDate() === dy.getDate()
  };
};

export default checkIfDatePartsMatch;
