import React from 'react';

import { RadioToggle, Icons } from '../lib';

const mockedChangeFn = jest.fn();

afterEach(() => jest.resetAllMocks());

it('should render with minimum props', function() {
  const component = shallow(
    <RadioToggle
      className="story"
      label="jest label"
      name="story"
      checked={false}
      onChange={mockedChangeFn}
    />
  );

  expect(component.is('.radio-toggle')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should render custom icons', function() {
  const component = shallow(
    <RadioToggle
      className="story"
      label="jest label"
      name="story"
      icons={[Icons.left, Icons.right]}
      checked={false}
      onChange={mockedChangeFn}
    />
  );

  expect(component.find('.radio-toggle__checked').text()).toEqual(Icons.left);
  expect(component.find('.radio-toggle__unchecked').text()).toEqual(
    Icons.right
  );
  expect(component).toMatchSnapshot();
});

it('should pass click from parent to input', function() {
  const mockClickFn = jest.fn();

  const component = mount(
    <RadioToggle
      className="story"
      label="jest label"
      name="story"
      icons={[Icons.left, Icons.right]}
      checked={false}
      onChange={mockedChangeFn}
    />
  );

  const input = component.find('input').get(0);
  const inputDOMNode = input.ref.current;
  inputDOMNode.click = mockClickFn;

  component.find('.radio-toggle').prop('onClick')({
    target: null,
    preventDefault: () => null
  });

  expect(mockClickFn).toHaveBeenCalled();
  component.unmount();
});

it('should call on change function on change', function() {
  const checked = true;
  const name = 'story';
  const component = shallow(
    <RadioToggle
      className="story"
      label="jest label"
      name="story"
      icons={[Icons.left, Icons.right]}
      checked={false}
      onChange={mockedChangeFn}
    />
  );

  component.find('input').prop('onChange')({ target: { checked, name } });

  expect(mockedChangeFn).toHaveBeenCalledWith(checked, name);
});
