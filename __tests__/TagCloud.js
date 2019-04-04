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

it('should render with minimum props', function() {
  const component = shallow(
    <TagCloudSelector
      name="selectedTags"
      tagOptions={OPTIONS}
      onSelect={mockedSelectFn}
    />
  );

  expect(component.is('.tag-cloud')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should render correct children', function() {
  const component = shallow(
    <TagCloudSelector
      name="selectedTags"
      tagOptions={OPTIONS}
      onSelect={mockedSelectFn}
    />
  );

  expect(component.find('TagChip').length).toEqual(8);
  expect(component).toMatchSnapshot();
});

it('should display clear button when has selected', function() {
  const component = shallow(
    <TagCloudSelector
      name="selectedTags"
      selectedTags={[1]}
      tagOptions={OPTIONS}
      onSelect={mockedSelectFn}
    />
  );

  expect(component.find('Button').exists()).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should call onSelect when cleared', function() {
  const component = shallow(
    <TagCloudSelector
      name="selectedTags"
      selectedTags={[1]}
      tagOptions={OPTIONS}
      onSelect={mockedSelectFn}
    />
  );

  component.find('Button').prop('onClick')();

  expect(mockedSelectFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});

it('should call onSelect when tagchip is clicked', function() {
  const component = shallow(
    <TagCloudSelector
      name="selectedTags"
      selectedTags={[1]}
      tagOptions={OPTIONS}
      onSelect={mockedSelectFn}
    />
  );

  component
    .find('TagChip')
    .at(1)
    .prop('onClick')(OPTIONS[1]);

  expect(mockedSelectFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});
