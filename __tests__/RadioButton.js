import React from 'react';

import { RadioButton } from '../lib';

const mockedChangeFn = jest.fn();

const options = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' }
];

it('should render with minimum props', function () {
  const { container } = render(
    <RadioButton
      id="jest"
      name="jest"
      value={0}
      label="jester"
      checked={false}
      onChange={mockedChangeFn}
    />
  );

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should call onChange', async function () {
  const { container, getByLabelText } = render(
    <div className="radio-group">
      {options.map((o) => (
        <RadioButton
          key={o.value}
          id={`jest-${o.value}`}
          name="jest"
          value={o.value}
          label={o.text}
          checked={1 === o.value}
          onChange={mockedChangeFn}
        />
      ))}
    </div>
  );

  // hack because the proper way wasn't working
  getByLabelText('two').click();

  expect(mockedChangeFn).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});
