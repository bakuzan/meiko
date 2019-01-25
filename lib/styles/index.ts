import { css } from 'emotion';

export default function paint(...args: any[]) {
  return css(...args);
  const hasOwn = {}.hasOwnProperty;
  let styles = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) {
      continue;
    }

    const argType = typeof arg;

    if (Array.isArray(arg) && arg.length) {
      const inner = paint.apply(null, arg);
      if (inner) {
        styles = { ...styles, ...inner };
      }
    } else if (argType === 'object') {
      for (let key in arg) {
        if (hasOwn.call(arg, key)) {
          styles = { ...styles, ...arg[key] };
        }
      }
    }
  }

  return css({ ...styles });
}
