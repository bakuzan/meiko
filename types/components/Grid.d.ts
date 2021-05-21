import * as React from 'react';

export interface GridProps<T extends any> extends React.HTMLProps<HTMLElement> {
  items?: T[];
  noItemsText?: string | boolean;
  children?: (data: T, index: number, arr: T[]) => React.ReactNode;
  uniformRows?: boolean;
  footerChildren?: React.ReactNode | React.ReactElement<any>;
  element?: keyof JSX.IntrinsicElements;
}

declare const Grid: <T extends any>(
  props: React.PropsWithChildren<GridProps<T>>,
  ref: React.Ref<HTMLElement>
) => React.ReactElement | null;

export default Grid;
