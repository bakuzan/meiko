import mockDocumentEventListeners from '../__helpers__/documentEventListeners';

import addOutsideClick from '../../lib/utils/addOutsideClick';

const { trigger, mockedAddListenerFn } = mockDocumentEventListeners();

const mockedOutsideClickFn = jest.fn();
const mockedRemoveListenerFn = jest.fn();

const node = document.createElement('div');
const childNode = document.createElement('div');
node.appendChild(childNode);
document.body.appendChild(node);

beforeAll(() => {
  document.removeEventListener = mockedRemoveListenerFn;
});

beforeEach(() => {
  mockedOutsideClickFn.mockClear();
  mockedAddListenerFn.mockClear();
  mockedRemoveListenerFn.mockClear();
});

it('should call addEventListener twice', () => {
  addOutsideClick(node, mockedOutsideClickFn);

  expect(mockedAddListenerFn).toHaveBeenCalledTimes(2);
});

it('should call removeEventListener twice', () => {
  const remove = addOutsideClick(node, mockedOutsideClickFn);
  remove();

  expect(mockedRemoveListenerFn).toHaveBeenCalledTimes(2);
});

it('should call outsideClick callback on outisde click', () => {
  addOutsideClick(node, mockedOutsideClickFn);

  trigger.click({ target: document.body });

  expect(mockedOutsideClickFn).toHaveBeenCalled();
});

it('should not call outsideClick callback on inside click', () => {
  addOutsideClick(node, mockedOutsideClickFn);

  trigger.click({ target: childNode });

  expect(mockedOutsideClickFn).not.toHaveBeenCalled();
});

it('should call outsideClick callback on escape keydown', () => {
  addOutsideClick(node, mockedOutsideClickFn);

  trigger.keydown({ key: 'Escape' });

  expect(mockedOutsideClickFn).toHaveBeenCalled();
});

it('should not call outsideClick callback on non-escape keydown', () => {
  addOutsideClick(node, mockedOutsideClickFn);

  trigger.keydown({ key: ' ' });

  expect(mockedOutsideClickFn).not.toHaveBeenCalled();
});
