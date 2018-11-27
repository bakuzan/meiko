import { Types } from 'constants';

const isTypeOf = (t) => (v) => typeof v === t;
export const isObject = isTypeOf(Types.object);
export const isString = isTypeOf(Types.string);
export const isNumber = isTypeOf(Types.number);
export const isArray = (v) => v instanceof Array;
