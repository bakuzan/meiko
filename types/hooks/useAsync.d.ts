import { DependencyList } from 'react';

import { AsyncState } from './useAsyncFn';

export function useAsync<Result = any, Args extends any[] = any[]>(
  fn: (...args: Args | []) => Promise<Result>,
  deps?: DependencyList
): AsyncState<Result>;
