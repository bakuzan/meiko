import { act } from '@testing-library/react';
import React from 'react';

import { ChipListInput } from '../lib';
import { keydown } from './__helpers__/fireEvent';

const attr = 'text';
const options = [
  { id: 5, text: 'Bat' },
  { id: 6, text: 'Cat' },
  { id: 9, text: 'Frog' }
];

const mockUpdateFn = jest.fn();
afterEach(() => jest.resetAllMocks());

it('should render with minimum props', function () {
  const { container } = render(
    <ChipListInput
      id="jest"
      name="jest"
      attr={attr}
      chipsSelected={[]}
      chipOptions={options}
      updateChipList={mockUpdateFn}
    />
  );

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should call updateChipList when suggestion is clicked', async function () {
  const { container, getByLabelText, getByTitle } = render(
    <ChipListInput
      id="jest"
      name="jest"
      label="jest test"
      attr={attr}
      chipsSelected={[]}
      chipOptions={options}
      updateChipList={mockUpdateFn}
    />
  );

  const input = getByLabelText('jest test');
  const user = userEvent.setup();

  await act(async () => {
    await user.click(input);

    fireEvent.change(input, { target: { value: 'at' } });

    await user.click(getByTitle('Bat'));
  });

  expect(mockUpdateFn).toHaveBeenCalledWith('jest', [{ id: 5, text: 'Bat' }]);
  expect(container).toMatchSnapshot();
});

it('should render selected chips and remove', async function () {
  const { container, getByText, getByTitle } = render(
    <ChipListInput
      id="jest"
      name="jest"
      attr={attr}
      chipsSelected={[{ id: 5, text: 'Bat' }]}
      chipOptions={options}
      updateChipList={mockUpdateFn}
    />
  );

  const chip = getByText('Bat');
  expect(chip).toBeTruthy();
  expect(container).toMatchSnapshot();

  const chipRemove = getByTitle('remove');
  const user = userEvent.setup();
  await user.click(chipRemove);

  expect(mockUpdateFn).toHaveBeenCalledWith('jest', []);
  expect(container).toMatchSnapshot();
});

it('should ready removal of selected chip', function () {
  const { container, getByLabelText } = render(
    <ChipListInput
      id="jest"
      name="jest"
      attr={attr}
      chipsSelected={[{ id: 5, text: 'Bat' }]}
      chipOptions={options}
      updateChipList={mockUpdateFn}
    />
  );

  const input = getByLabelText('tags');
  keydown(input, { key: 'Backspace' });
  keydown(input, { key: 'Backspace' });

  expect(mockUpdateFn).toHaveBeenCalledWith('jest', []);
  expect(container).toMatchSnapshot();
});
