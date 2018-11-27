export const getObjectFromLocalStorageByProperty = (property) =>
  JSON.parse(localStorage.getItem(property)) || null;

export const persistObjectToLocalStorage = (property) => (newValues) => {
  const values = getObjectFromLocalStorageByProperty(property) || {};
  const updated = { ...values, ...newValues };
  localStorage.setItem(property, JSON.stringify(updated));
  return updated;
};
