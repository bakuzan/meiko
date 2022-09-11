import React from 'react';

import { TagCloudSelector } from '../lib';

const OPTIONS = [
  { id: 1, name: 'react', count: 5 },
  { id: 2, name: 'jquery', count: 0 },
  { id: 3, name: 'angular', count: 0 },
  { id: 4, name: 'elm', count: 2 },
  { id: 5, name: 'graphql', count: 3 },
  { id: 6, name: 'apollo', count: 1 },
  { id: 7, name: 'python', count: 1 },
  { id: 8, name: 'rust', count: 1 }
];

const mockedSelectFn = jest.fn();

it('should render with minimum props', function () {
  const { container } = render(
    <TagCloudSelector
      name="selectedTags"
      tagOptions={OPTIONS}
      onSelect={mockedSelectFn}
    />
  );

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should render correct children', function () {
  const { container, getByText } = render(
    <TagCloudSelector
      name="selectedTags"
      tagOptions={OPTIONS}
      onSelect={mockedSelectFn}
    />
  );

  OPTIONS.forEach((option) => expect(getByText(option.name)).toBeTruthy());

  expect(container).toMatchSnapshot();
});

it('should display clear button when has selected', function () {
  const { container, getByText } = render(
    <TagCloudSelector
      name="selectedTags"
      selectedTags={[1]}
      tagOptions={OPTIONS}
      onSelect={mockedSelectFn}
    />
  );

  expect(getByText('Clear')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should call onSelect when cleared', async function () {
  const { container, getByText } = render(
    <TagCloudSelector
      name="selectedTags"
      selectedTags={[1]}
      tagOptions={OPTIONS}
      onSelect={mockedSelectFn}
    />
  );

  const user = userEvent.setup();
  await user.click(getByText('Clear'));

  expect(mockedSelectFn).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});

it('should call onSelect when tagchip is clicked', async function () {
  const { container, getByText } = render(
    <TagCloudSelector
      name="selectedTags"
      selectedTags={[1]}
      tagOptions={OPTIONS}
      onSelect={mockedSelectFn}
    />
  );

  const user = userEvent.setup();
  await user.click(getByText(OPTIONS[1].name));

  expect(mockedSelectFn).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});
