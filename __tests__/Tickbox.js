import React from 'react';

import { Tickbox } from '../lib';

const mockedChangeFn = jest.fn();

it('should render with minimum props', function () {
  const { container } = render(
    <Tickbox id="jest" checked={false} onChange={mockedChangeFn} />
  );

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should toggle checkbox on click', async function () {
  const changeEvent = { target: { checked: true } };
  const { container, getByLabelText } = render(
    <Tickbox
      id="jest"
      checked={false}
      text="checkbox test"
      onChange={mockedChangeFn}
    />
  );

  expect(getByLabelText('checkbox test').checked).toBe(false);

  const user = userEvent.setup();
  await user.click(getByLabelText('checkbox test'));

  expect(mockedChangeFn).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});
