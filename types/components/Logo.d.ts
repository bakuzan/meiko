import * as React from 'react';

export interface LogoProps {
  id?: string;
  text: string;
}

declare class Logo extends React.Component<LogoProps, any> {}

export default Logo;
