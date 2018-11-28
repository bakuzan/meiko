import * as Date from './date';
import Toaster from './toaster';
import MeikoFetch, { handleErrorResponse } from './fetch';
import * as GraphqlProcessing from './fetch/graphql-processing';

import {
  capitalise,
  capitaliseEachWord,
  separateAndCapitalise,
  separateAndCapitaliseAll
} from './capitalise';
import castStringToBool from './castStringToBool';
import compose from './compose';
import constructObjectFromSearchParams from './constructObjectFromSearchParams';
import convertToBase64 from './convertToBase64';
import createListeners from './createListeners';
import curry from './curry';
import debounce from './debounce';
import fromCamelCase from './fromCamelCase';
import generateUniqueId from './generateUniqueId';
import getElementCoordinates from './getElementCoordinates';
import getEventValue from './getEventValue';
import getKeyByValue from './getKeyByValue';
import getSinglePropertyObject from './getSinglePropertyObject';
import { getTimeoutSeconds, getTimeoutMinutes } from './getTimeout';
import {
  getObjectFromLocalStorageByProperty,
  persistObjectToLocalStorage
} from './localStorage';
import objectsAreEqual from './objectsAreEqual';
import padNumber from './padNumber';
import parseIfInt from './parseIfInt';
import { isArray, isNumber, isObject, isString } from './typeof';
import updateSameAsObject from './updateSameAsObject';

export {
  // common fn's below
  capitalise,
  capitaliseEachWord,
  separateAndCapitalise,
  separateAndCapitaliseAll,
  castStringToBool,
  compose,
  constructObjectFromSearchParams,
  convertToBase64,
  createListeners,
  curry,
  debounce,
  fromCamelCase,
  generateUniqueId,
  getElementCoordinates,
  getEventValue,
  getKeyByValue,
  getSinglePropertyObject,
  getTimeoutSeconds,
  getTimeoutMinutes,
  getObjectFromLocalStorageByProperty,
  persistObjectToLocalStorage,
  objectsAreEqual,
  padNumber,
  parseIfInt,
  updateSameAsObject,
  isArray,
  isNumber,
  isObject,
  isString,
  // Special Utils
  Date,
  Toaster,
  MeikoFetch,
  handleErrorResponse,
  GraphqlProcessing
};
