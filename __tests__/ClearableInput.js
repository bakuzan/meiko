import React from 'react';

import { ClearableInput } from '../lib';

const value = '';
const mockChangeFn = jest.fn();

afterEach(() => jest.resetAllMocks());

it('should render with minimum props', function() {
  const component = shallow(
    <ClearableInput id="jest" value={value} onChange={mockChangeFn} />
  );

  expect(component.is('.clearable-input')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should call onChange when value is updated', function() {
  const changeEvent = { target: { value: 'hello world' } };
  const component = mount(
    <ClearableInput id="jest" value={value} onChange={mockChangeFn} />
  );

  const input = component.find('input#jest');
  input.simulate('change', changeEvent);

  expect(mockChangeFn).toHaveBeenCalled();
  component.unmount();
});

it('should be clearable when type equals "text"', function() {
  const component = mount(
    <ClearableInput id="jest" value={'hello world'} onChange={mockChangeFn} />
  );

  const clearButton = component.find('button.clearable-input__clear');
  clearButton.simulate('click');

  component.setProps({ value: '' });

  expect(mockChangeFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
  component.unmount();
});

it('should NOT be clearable when type does not equal "text"', function() {
  const component = mount(
    <ClearableInput
      id="jest"
      value={39}
      type="number"
      onChange={mockChangeFn}
    />
  );

  const clearButton = component.find('button.clearable-input__clear');

  expect(clearButton.exists()).toBe(false);
  component.unmount();
});

it('should display max length text', function() {
  const component = mount(
    <ClearableInput
      id="jest"
      value={'hello world'}
      maxLength={140}
      onChange={mockChangeFn}
    />
  );

  const countElement = component.find('.clearable-input__count');

  expect(countElement.text()).toEqual('11/140');
  component.unmount();
});

it('should display max text for number field', function() {
  const component = mount(
    <ClearableInput
      id="jest"
      value={'hello world'}
      type="number"
      max={10}
      onChange={mockChangeFn}
    />
  );

  const countElement = component.find('.clearable-input__count');

  expect(countElement.text()).toEqual('out of 10');
  component.unmount();
});

it('should render error', function() {
  const message = 'Jest Error Test';

  const component = mount(
    <ClearableInput
      id="jest"
      value={'hello world'}
      error=""
      onChange={mockChangeFn}
    />
  );

  let error = component.find('.clearable-input__error');
  expect(error.exists()).toBe(false);

  component.setProps({ error: message });

  error = component.find('.clearable-input__error');
  expect(error.exists()).toBe(true);
  expect(error.text()).toEqual(message);
  component.unmount();
});
