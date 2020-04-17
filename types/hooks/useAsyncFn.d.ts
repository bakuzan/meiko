import { DependencyList } from 'react';

export type AsyncState<T> =
  | {
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };

export type AsyncFn<Result = any, Args extends any[] = any[]> = [
  AsyncState<Result>,
  (...args: Args | []) => Promise<Result>,
  () => void
];

export function useAsyncFn<Result = any, Args extends any[] = any[]>(
  fn: (...args: Args | []) => Promise<Result>,
  deps?: DependencyList,
  initialState?: AsyncState<Result>
): AsyncFn<Result, Args>;
