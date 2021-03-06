import React from 'react';
import { act } from '@testing-library/react';

import mockDocumentEventListeners from './__helpers__/documentEventListeners';

import { MultiSelect } from '../lib';

const { trigger } = mockDocumentEventListeners();

const mockedUpdateFn = jest.fn();

const options = [
  { value: 1, text: 'Gen1' },
  { value: 2, text: 'Gen2' },
  { value: 3, text: 'Gen3' },
  { value: 4, text: 'Gen4' }
];

const clickToOpenEvent = {
  type: 'click',
  stopPropagation: () => null
};

afterEach(() => jest.restoreAllMocks());

it('should render with minimum props', function() {
  const component = shallow(
    <MultiSelect
      id="mko"
      placeholder="Select a jester"
      values={[]}
      options={options}
      onUpdate={mockedUpdateFn}
    />
  );

  expect(component.is('.multi-select')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should open dropdown on input click', function() {
  const component = shallow(
    <MultiSelect
      id="mko"
      placeholder="Select a jester"
      values={[]}
      options={options}
      onUpdate={mockedUpdateFn}
    />
  );

  const menuBeforeClick = component.exists(
    '.multi-select__dropdown-container--is-open'
  );
  expect(menuBeforeClick).toBe(false);

  component.find('.multi-select__input').prop('onClick')(clickToOpenEvent);

  const menuAfterClick = component.exists(
    '.multi-select__dropdown-container--is-open'
  );
  expect(menuAfterClick).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should render correct number of options', function() {
  const component = shallow(
    <MultiSelect
      id="mko"
      placeholder="Select a jester"
      values={[]}
      options={options}
      onUpdate={mockedUpdateFn}
    />
  );

  component.find('.multi-select__input').prop('onClick')(clickToOpenEvent);

  expect(component.find('Tickbox').length).toBe(options.length + 1);
  expect(component).toMatchSnapshot();
});

it('should call onUpdate when select all clicked', function() {
  const component = shallow(
    <MultiSelect
      id="mko"
      placeholder="Select a jester"
      values={[]}
      options={options}
      onUpdate={mockedUpdateFn}
    />
  );

  component.find('.multi-select__input').prop('onClick')(clickToOpenEvent);

  component
    .find('Tickbox')
    .at(0)
    .prop('onChange')();

  expect(mockedUpdateFn).toHaveBeenCalledWith(
    options.map((x) => x.value),
    undefined
  );
  expect(component).toMatchSnapshot();
});

it('should call onUpdate when tickboxes are changed', function() {
  const component = shallow(
    <MultiSelect
      id="mko"
      placeholder="Select a jester"
      values={[]}
      options={options}
      onUpdate={mockedUpdateFn}
    />
  );

  component.find('.multi-select__input').prop('onClick')(clickToOpenEvent);

  component
    .find('Tickbox')
    .at(1)
    .prop('onChange')({ target: { name: 'mko--option-0' } });
  expect(mockedUpdateFn).toHaveBeenCalledWith([1], undefined);

  component.setProps({ values: [1] });

  component
    .find('Tickbox')
    .at(4)
    .prop('onChange')({ target: { name: 'mko--option-3' } });

  expect(mockedUpdateFn).toHaveBeenCalledWith([1, 4], undefined);
  expect(component).toMatchSnapshot();
});

xit('should close dropdown on outside click', async function() {
  const component = mount(
    <MultiSelect
      id="mko"
      placeholder="Select a jester"
      values={[]}
      options={options}
      onUpdate={mockedUpdateFn}
    />
  );

  await act(async () => {
    component.setState({ isOpen: true });
    trigger.click({ target: document.body });
  });

  const menuAfterOutsideClick = component.exists(
    '.multi-select__dropdown-container--is-open'
  );
  expect(menuAfterOutsideClick).toBe(false);
  expect(component).toMatchSnapshot();
  component.unmount();
});
