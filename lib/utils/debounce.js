const timers = {};
function debounce(f, t) {
  clearTimeout(timers[f]);

  timers[f] = setTimeout(() => f(), t);

  return timers[f];
}

export default debounce;
