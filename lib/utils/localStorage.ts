export const getObjectFromLocalStorageByProperty = (property: string): Object =>
  JSON.parse(localStorage.getItem(property)) || null;

export const persistObjectToLocalStorage = (property: string) => (
  newValues: Object
): Object => {
  const values = getObjectFromLocalStorageByProperty(property) || {};
  const updated = { ...values, ...newValues };
  localStorage.setItem(property, JSON.stringify(updated));
  return updated;
};
