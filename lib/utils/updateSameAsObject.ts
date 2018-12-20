const updateSameAsObject = (o: Object, u: Object) =>
  u &&
  Object.keys(u)
    .map((k) => o[k] === u[k])
    .every((x) => x === true);

export default updateSameAsObject;
