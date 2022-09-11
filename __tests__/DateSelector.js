import React from 'react';

import { DateSelector } from '../lib';

const mockedChangeFn = jest.fn();

it('should render with minimum props', function () {
  const { container } = render(<DateSelector id="jest" value="2019-04-05" />);

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should render standard view', function () {
  const { container, getByLabelText } = render(
    <DateSelector id="jest" label="jestInput" value="2019-04-05" />
  );

  expect(getByLabelText('jestInput')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

// todo must fix
xit('should render flat view', function () {
  const { container, queryByLabelText, getByText } = render(
    <DateSelector isFlat id="jest" label="jestInput" value="2019-04-05" />
  );

  expect(queryByLabelText('jestInput')).toBeNull();
  expect(getByText('Apr 2019')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

// todo must fix
xit('should open calendar', async function () {
  const { container, queryByText, getByLabelText, getByText } = render(
    <DateSelector id="jest" value="2019-04-05" />
  );

  expect(queryByText('Apr 2019')).toBeFalsy();

  const user = userEvent.setup();
  await user.click(getByLabelText('Open calendar'));

  expect(getByText('Apr 2019')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

// todo must fix
xit('should call onChange when clear is clicked', async function () {
  const { container, getByLabelText } = render(
    <DateSelector id="jest" value="2019-04-05" onChange={mockedChangeFn} />
  );

  const user = userEvent.setup();
  await user.click(getByLabelText('Clear date'));

  expect(mockedChangeFn).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});

it('should not display clear button when value required', function () {
  const { container, queryByLabelText } = render(
    <DateSelector
      id="jest"
      value="2019-04-05"
      required
      onChange={mockedChangeFn}
    />
  );

  expect(queryByLabelText('Clear date')).toBeNull();
  expect(container).toMatchSnapshot();
});
