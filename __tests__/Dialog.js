import React from 'react';

import { Dialog } from '../lib';

const mockedActionFn = jest.fn();
const mockedCloseFn = jest.fn();

const firstId = 'test';
const lastId = 'test';
const tabTrapProps = { firstId, lastId };

it('should render with minimum props', function () {
  const { container } = render(
    <Dialog
      name="jest"
      isOpen={false}
      onCancel={mockedCloseFn}
      tabTrapProps={tabTrapProps}
    >
      <div>jest</div>
    </Dialog>
  );

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should open when passed new prop', function () {
  const { container, rerender } = render(
    <Dialog
      name="jest"
      isOpen={false}
      onCancel={mockedCloseFn}
      tabTrapProps={tabTrapProps}
    >
      <div>jest</div>
    </Dialog>
  );

  expect(container.firstChild.open).toBe(false);

  rerender(
    <Dialog
      name="jest"
      isOpen={true}
      onCancel={mockedCloseFn}
      tabTrapProps={tabTrapProps}
    >
      <div>jest</div>
    </Dialog>
  );

  expect(container.firstChild.open).toBe(true);
  expect(container).toMatchSnapshot();
});

// todo must fix
xit('should call onCancel when cancel button clicked', async function () {
  const { container, getByText } = render(
    <Dialog
      name="jest"
      isOpen={true}
      onCancel={mockedCloseFn}
      tabTrapProps={tabTrapProps}
    >
      <div>jest</div>
    </Dialog>
  );

  const user = userEvent.setup();
  await user.click(getByText('Cancel'));

  expect(mockedCloseFn).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});

// todo must fix
xit('should render action button and call onAction when clicked', async function () {
  const { container, getByText } = render(
    <Dialog
      name="jest"
      isOpen={true}
      onAction={mockedActionFn}
      onCancel={mockedCloseFn}
      tabTrapProps={tabTrapProps}
    >
      <div>jest</div>
    </Dialog>
  );

  const user = userEvent.setup();
  await user.click(getByText('Submit'));

  expect(mockedActionFn).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});

it('should only render title when passed', function () {
  const { container, queryByRole, rerender } = render(
    <Dialog
      name="jest"
      isOpen={true}
      onAction={mockedActionFn}
      onCancel={mockedCloseFn}
      tabTrapProps={tabTrapProps}
    >
      <div>jest</div>
    </Dialog>
  );

  expect(queryByRole('heading')).toBeNull();

  rerender(
    <Dialog
      name="jest"
      title={'jester!'}
      isOpen={true}
      onAction={mockedActionFn}
      onCancel={mockedCloseFn}
      tabTrapProps={tabTrapProps}
    >
      <div>jest</div>
    </Dialog>
  );

  expect(queryByRole('heading')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should replace form element with div', function () {
  const { container, getByText, rerender } = render(
    <Dialog
      name="jest"
      isOpen={true}
      onAction={mockedActionFn}
      onCancel={mockedCloseFn}
      tabTrapProps={tabTrapProps}
    >
      <div>jest</div>
    </Dialog>
  );

  expect(getByText('Submit').type).toEqual('submit');

  rerender(
    <Dialog
      name="jest"
      isOpen={true}
      isForm={false}
      onAction={mockedActionFn}
      onCancel={mockedCloseFn}
      tabTrapProps={tabTrapProps}
    >
      <div>jest</div>
    </Dialog>
  );

  expect(getByText('Submit').type).toEqual('button');
  expect(container).toMatchSnapshot();
});
