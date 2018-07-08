import { Strings, Types } from '../constants';

export const capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const parseIfInt = (val) => {
  const maybeInt = parseInt(val, 10);
  return maybeInt === 0 || !!maybeInt ? maybeInt : val;
};
export const castStringToBool = (val) =>
  val === 'true' ? true : val === 'false' ? false : val;

export const getEventValue = ({ type, checked, value }) =>
  type === Strings.checkbox
    ? checked
    : type === Strings.date || type === Strings.text
      ? value
      : parseIfInt(value);

export const padNumber = (n, width, z = 0) => {
  n += '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

export const getKeyByValue = (o, v) => Object.keys(o).find((k) => o[k] === v);
export const getSingleObjectProperty = (o) =>
  !!o ? o[Object.keys(o)[0]] : null;

export const getObjectFromLocalStorageByProperty = (property) =>
  JSON.parse(localStorage.getItem(property)) || null;

export const persistObjectToLocalStorage = (property) => (newValues) => {
  const values = getObjectFromLocalStorageByProperty(property) || {};
  const updated = { ...values, ...newValues };
  localStorage.setItem(property, JSON.stringify(updated));
  return updated;
};

export const getTimeoutSeconds = (s) => 1000 * s;
export const getTimeoutMinutes = (m) => getTimeoutSeconds(60) * m;

const timers = {};
export const debounce = (f, t) => {
  clearTimeout(timers[f]);
  timers[f] = setTimeout(() => f(), t);
  return timers[f];
};

export const updateSameAsObject = (o, u) =>
  u &&
  Object.keys(u)
    .map((k) => o[k] === u[k])
    .every((x) => x === true);

const isTypeOf = (t) => (v) => typeof v === t;
export const isObject = isTypeOf(Types.object);
export const isString = isTypeOf(Types.string);
export const isNumber = isTypeOf(Types.number);
export const isArray = (v) => v instanceof Array;

export const convertToBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.onloadend = callback;
  reader.readAsDataURL(file);
};

export const createListeners = (t, f) => (el = document) => ({
  listen: () => el.addEventListener(t, f),
  remove: () => el.removeEventListener(t, f)
});

export const objectsAreEqual = (o1, o2) => {
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
};

export const generateUniqueId = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));

export function curry(uncurried) {
  const parameters = Array.prototype.slice.call(arguments, 1);
  return function() {
    return uncurried.apply(
      this,
      parameters.concat(Array.prototype.slice.call(arguments, 0))
    );
  };
}

const parseSearchParamValue = compose(
  castStringToBool,
  parseIfInt,
  decodeURIComponent
);
export const constructObjectFromSearchParams = (searchParam = '') =>
  searchParam
    .slice(1)
    .split('&')
    .reduce((p, c) => {
      const [key, raw] = c.split('=');
      const value = parseSearchParamValue(raw);
      return { ...p, [key]: value };
    }, {});

export function getElementCoordinates(elem) {
  const box = elem.getBoundingClientRect();
  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;
  const clientWidth = docEl.clientWidth;
  const clientHeight = docEl.clientHeight;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;
  return {
    top: Math.round(top),
    left: Math.round(left),
    right: Math.round(clientWidth - (left + box.width)),
    bottom: Math.round(clientHeight - (top + box.height))
  };
}
