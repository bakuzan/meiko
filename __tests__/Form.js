import React from 'react';

import { Form } from '../lib';

const subOps = {
  onSubmit: jest.fn()
};

const canOps = {
  onCancel: jest.fn()
};

it('should render with minimum props', function () {
  const { container } = render(
    <Form name="jest" submitOptions={subOps} cancelOptions={canOps}>
      <div>Form Children</div>
    </Form>
  );

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should render children', function () {
  const { container, getByText } = render(
    <Form name="jest" submitOptions={subOps} cancelOptions={canOps}>
      <div id="jestChild">Form Children</div>
    </Form>
  );

  expect(getByText('Form Children')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should render title if truthy', function () {
  const { container, queryByRole, getByText, rerender } = render(
    <Form name="jest" submitOptions={subOps} cancelOptions={canOps}>
      <div>Form Children</div>
    </Form>
  );

  expect(queryByRole('heading')).toBeNull();

  rerender(
    <Form
      name="jest"
      title={'jester'}
      submitOptions={subOps}
      cancelOptions={canOps}
    >
      <div>Form Children</div>
    </Form>
  );

  expect(getByText('jester')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should display custom submit button text', function () {
  const customText = 'Save - Jest';
  const { container, getByText, rerender } = render(
    <Form name="jest" submitOptions={subOps} cancelOptions={canOps}>
      <div>Form Children</div>
    </Form>
  );

  expect(getByText('Save')).toBeTruthy();

  rerender(
    <Form
      name="jest"
      submitOptions={{ ...subOps, text: customText }}
      cancelOptions={canOps}
    >
      <div>Form Children</div>
    </Form>
  );

  expect(getByText(customText)).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should call onSubmit', async function () {
  const { container, getByText } = render(
    <Form name="jest" submitOptions={subOps} cancelOptions={canOps}>
      <div>Form Children</div>
    </Form>
  );

  const user = userEvent.setup();
  await user.click(getByText('Save'));

  expect(subOps.onSubmit).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});

it('should call onCancel', async function () {
  const { container, getByText } = render(
    <Form name="jest" submitOptions={subOps} cancelOptions={canOps}>
      <div>Form Children</div>
    </Form>
  );

  const user = userEvent.setup();
  await user.click(getByText('Cancel'));

  expect(canOps.onCancel).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});
