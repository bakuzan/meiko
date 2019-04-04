function createAddEventListenerMock() {
  const map = {
    click: null,
    keydown: null
  };

  Object.defineProperty(document, 'addEventListener', {
    value: jest.fn((event, cb) => {
      console.log('MOCK', event, cb);
      map[event] = cb;
    })
  });

  return map;
}

export default function mountWithOutsideClick(mountSrc) {
  const trigger = createAddEventListenerMock();

  const outerNode = document.createElement('div');
  document.body.appendChild(outerNode);

  const component = mount(mountSrc, { attachTo: outerNode });

  console.log(trigger);

  return {
    component,
    trigger
  };

  return {
    component,
    mockOutsideClick: () => {
      const element = outerNode;
      const clickEvent = new Event('click', { bubbles: true });
      element.dispatchEvent(clickEvent);
      console.log('update', this);
      this.component.update();
    }
  };
}
