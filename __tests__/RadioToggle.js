import React from 'react';

import { RadioToggle, Icons } from '../lib';

const mockedChangeFn = jest.fn();

afterEach(() => jest.resetAllMocks());

it('should render with minimum props', function () {
  const { container } = render(
    <RadioToggle
      className="story"
      label="jest label"
      name="story"
      checked={false}
      onChange={mockedChangeFn}
    />
  );

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should render custom icons', function () {
  const { container, getByText } = render(
    <RadioToggle
      className="story"
      label="jest label"
      name="story"
      icons={[Icons.left, Icons.right]}
      checked={false}
      onChange={mockedChangeFn}
    />
  );

  expect(getByText(Icons.left)).toBeTruthy();
  expect(getByText(Icons.right)).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should pass click from parent to input', async function () {
  const { container } = render(
    <RadioToggle
      className="story"
      label="jest label"
      name="story"
      icons={[Icons.left, Icons.right]}
      checked={false}
      onChange={mockedChangeFn}
    />
  );

  const user = userEvent.setup();
  await user.click(container.firstChild);

  expect(mockedChangeFn).toHaveBeenCalled();
});

it('should call on change function on change', async function () {
  const checked = true;
  const name = 'story';
  const { getByLabelText } = render(
    <RadioToggle
      className="story"
      label="jest label"
      name="story"
      icons={[Icons.left, Icons.right]}
      checked={false}
      onChange={mockedChangeFn}
    />
  );

  const user = userEvent.setup();
  await user.click(getByLabelText('jest label'));

  expect(mockedChangeFn).toHaveBeenCalledWith(checked, name);
});
