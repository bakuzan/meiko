export default function mockDocumentEventListeners() {
  const trigger = {};
  const mockedAddListenerFn = jest.fn((event, cb) => {
    trigger[event] = cb;
  });

  document.addEventListener = mockedAddListenerFn;

  return { trigger, mockedAddListenerFn };
}
