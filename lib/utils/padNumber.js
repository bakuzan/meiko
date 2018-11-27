export default function padNumber(n, width, z = 0) {
  n += '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
