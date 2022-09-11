import React from 'react';

import { RatingControl } from '../lib';

const mockedChangeFn = jest.fn();

it('should render with minimum props', function () {
  const { container } = render(<RatingControl id="jest" value={0} />);

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should call onChange', async function () {
  const { container, getByLabelText } = render(
    <RatingControl id="jest" value={0} onChange={mockedChangeFn} />
  );

  const user = userEvent.setup();
  await user.click(getByLabelText('4/10'));

  expect(mockedChangeFn).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});

it('should return value of 0 if active value is selected', async function () {
  const { container, getByLabelText } = render(
    <RatingControl id="jest" value={5} onChange={mockedChangeFn} />
  );

  const user = userEvent.setup();
  await user.click(getByLabelText('5/10 (selected)'));

  expect(mockedChangeFn).toHaveBeenCalledWith({
    target: {
      type: 'radio',
      value: 0,
      name: undefined
    }
  });
  expect(container).toMatchSnapshot();
});

it('should render "maxRating" number of inputs', function () {
  const { container, rerender } = render(
    <RatingControl id="jest" value={0} onChange={mockedChangeFn} />
  );

  // Default prop, plus 1 for the label
  expect(container.firstChild.children.length).toEqual(10 + 1);

  rerender(
    <RatingControl
      id="jest"
      value={0}
      maxRating={3}
      onChange={mockedChangeFn}
    />
  );
  expect(container.firstChild.children.length).toEqual(3 + 1);
  expect(container).toMatchSnapshot();

  rerender(
    <RatingControl
      id="jest"
      value={0}
      maxRating={15}
      onChange={mockedChangeFn}
    />
  );
  expect(container.firstChild.children.length).toEqual(15 + 1);
  expect(container).toMatchSnapshot();
});
