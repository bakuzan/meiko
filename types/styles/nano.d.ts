import { NanoRenderer } from 'nano-css';

declare module 'meiko/styles/nano' {
  const nano: NanoRenderer;

  export { nano };
}
