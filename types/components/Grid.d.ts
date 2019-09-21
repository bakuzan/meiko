import * as React from 'react';

export interface GridProps extends React.HTMLProps<HTMLUListElement> {
  items?: any[];
  noItemsText?: string | boolean;
  children?:
    | ((data: any, index: number, arr: any[]) => React.ReactNode)
    | ((data: any, index: number, arr: any[]) => React.ReactElement<any>);
  uniformRows?: boolean;
  footerChildren?: React.ReactNode | React.ReactElement<any>;
}

declare const Grid: React.SFC<GridProps>;

export default Grid;
