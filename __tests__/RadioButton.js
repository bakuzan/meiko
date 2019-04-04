import React from 'react';

import { RadioButton } from '../lib';

const mockedChangeFn = jest.fn();

const options = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' }
];

it('should render with minimum props', function() {
  const component = shallow(
    <RadioButton
      id="jest"
      name="jest"
      value={0}
      label="jester"
      checked={false}
      onChange={mockedChangeFn}
    />
  );

  expect(component.is('.radio')).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should call onChange', function() {
  const changeEvent = { target: { value: 2 } };
  const component = mount(
    <div className="radio-group">
      {options.map((o) => (
        <RadioButton
          key={o.value}
          id="jest"
          name="jest"
          value={o.value}
          label={o.text}
          checked={1 === o.value}
          onChange={mockedChangeFn}
        />
      ))}
    </div>
  );

  component
    .find('.radio__input')
    .at(1)
    .prop('onChange')(changeEvent);

  expect(mockedChangeFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
  component.unmount();
});
