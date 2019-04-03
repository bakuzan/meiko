export default function mountWithOutsideClick(mountSrc, selector) {
  const outerNode = document.createElement('div');
  document.body.appendChild(outerNode);

  const component = mount(mountSrc, { attachTo: outerNode });

  return {
    component,
    mockOutsideClick() {
      const element = outerNode;
      const clickEvent = new Event('click', { bubbles: true });
      element.dispatchEvent(clickEvent);
    }
  };
}
