export function keydown(element, event) {
  element.focus();
  fireEvent.keyDown(document.activeElement || document.body, event);
}
