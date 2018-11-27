import { isObject, isArray } from './typeof';

export default function objectsAreEqual(o1, o2) {
  if (!isObject(o1) || !isObject(o2)) return o1 === o2;
  return Object.keys(o1).every((k) => {
    const one = o1[k];
    const two = o2[k];
    return isArray(one)
      ? one
          .map((t, i) => objectsAreEqual(one[i], two[i]))
          .every((b) => b === true)
      : one === two;
  });
}
