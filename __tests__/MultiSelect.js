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

it('should render with minimum props', function () {
  const { container } = render(
    <MultiSelect
      id="mko"
      placeholder="Select a jester"
      values={[]}
      options={options}
      onUpdate={mockedUpdateFn}
    />
  );

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

// todo must fix
xit('should open dropdown on input click', async function () {
  const { container, getByPlaceholderText } = render(
    <MultiSelect
      id="mko"
      placeholder="Select a jester"
      values={[]}
      options={options}
      onUpdate={mockedUpdateFn}
    />
  );

  const menuElement = document.querySelector(
    '.multi-select__dropdown-container'
  );

  expect(menuElement['aria-hidden']).toBe(true);
  expect(container).toMatchSnapshot();

  const user = userEvent.setup();
  await user.click(getByPlaceholderText('Select a jester'));

  expect(menuElement['aria-hidden']).toBe(false);
  expect(container).toMatchSnapshot();
});

it('should render correct number of options', async function () {
  const { container, getByPlaceholderText, getByLabelText } = render(
    <MultiSelect
      id="mko"
      placeholder="Select a jester"
      values={[]}
      options={options}
      onUpdate={mockedUpdateFn}
    />
  );

  const user = userEvent.setup();
  await user.click(getByPlaceholderText('Select a jester'));

  expect(getByLabelText('Select All')).toBeTruthy();
  options.forEach((option) => expect(getByLabelText(option.text)).toBeTruthy());

  expect(container).toMatchSnapshot();
});

// todo must fix
xit('should call onUpdate when select all clicked', async function () {
  const { container, getByPlaceholderText, getByLabelText } = render(
    <MultiSelect
      id="mko"
      placeholder="Select a jester"
      values={[]}
      options={options}
      onUpdate={mockedUpdateFn}
    />
  );

  const user = userEvent.setup();
  await user.click(getByPlaceholderText('Select a jester'));
  await user.click(getByLabelText('Select All'));

  expect(mockedUpdateFn).toHaveBeenCalledWith(
    options.map((x) => x.value),
    undefined
  );
  expect(container).toMatchSnapshot();
});

// todo must fix
xit('should call onUpdate when tickboxes are changed', async function () {
  const { container, getByLabelText, getByPlaceholderText, rerender } = render(
    <MultiSelect
      id="mko"
      placeholder="Select a jester"
      values={[]}
      options={options}
      onUpdate={mockedUpdateFn}
    />
  );

  const user = userEvent.setup();
  await user.click(getByPlaceholderText('Select a jester'));
  await user.click(getByLabelText(options[0].text));

  expect(mockedUpdateFn).toHaveBeenCalledWith([1], undefined);

  rerender(
    <MultiSelect
      id="mko"
      placeholder="Select a jester"
      values={[1]}
      options={options}
      onUpdate={mockedUpdateFn}
    />
  );

  await user.click(getByLabelText(options[2].text));

  expect(mockedUpdateFn).toHaveBeenCalledWith([1, 4], undefined);
  expect(container).toMatchSnapshot();
});

xit('should close dropdown on outside click', async function () {
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
