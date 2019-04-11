import React from 'react';

import { FormControls } from '../lib';

const mockChangeFn = jest.fn();

const options = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' }
];

afterEach(() => jest.resetAllMocks());

it('should render children', () => {
  const message = 'render this test error';
  const component = shallow(
    <FormControls.ErrorBlock>{message}</FormControls.ErrorBlock>
  );

  expect(component.text()).toEqual(message);
});

it('should render error for clearable input', function() {
  const message = 'Jest Error Test';

  const component = shallow(
    <FormControls.ClearableInput
      id="jest"
      name="jester"
      value={'hello world'}
      error=""
      onChange={mockChangeFn}
    />
  );

  let error = component.find('.form-control__error');
  expect(error.exists()).toBe(false);

  component.setProps({ error: message });

  error = component.find('.form-control__error');
  expect(error.exists()).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should render error for select box', function() {
  const message = 'Jest Error Test';

  const component = shallow(
    <FormControls.SelectBox
      id="jest"
      name="jester"
      text="Jesters"
      value={''}
      options={options}
      onChange={mockChangeFn}
    />
  );

  let error = component.find('.form-control__error');
  expect(error.exists()).toBe(false);

  component.setProps({ error: message });

  error = component.find('.form-control__error');
  expect(error.exists()).toBe(true);
  expect(component).toMatchSnapshot();
});
