import { toaster } from '../../lib';

const instance = { popToast: jest.fn() };

it('should return undefined if popping toast with no instance ', function() {
  const expected = undefined;

  const result = toaster.popToast({});

  expect(result).toEqual(expected);
  expect(instance.popToast).not.toHaveBeenCalled();
});

it('should store instance ', function() {
  const expected = instance;

  toaster.register(instance);
  const result = toaster.toaster;

  expect(result).toEqual(expected);
});

it('should call popToast on the instance', function() {
  function popTest(key) {
    toaster[key]('Nothing');
  }

  ['info', 'error', 'success', 'warning'].forEach((k) => popTest(k));

  expect(instance.popToast).toHaveBeenCalledTimes(4);
});
