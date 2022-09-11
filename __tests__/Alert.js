import React from 'react';
import { Alert } from '../lib';

const mockFn = jest.fn();
const actions = {
  dismissAlertMessage: mockFn
};

const alerts = [
  {
    id: 1,
    type: 'error',
    message: 'Test message',
    detail: 'More words'
  }
];

afterEach(() => jest.resetAllMocks());

it('should render null when no alerts present', function () {
  const { container } = render(<Alert alerts={[]} actions={actions} />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should render container when has alerts', function () {
  const { container, getByText } = render(
    <Alert alerts={alerts} actions={actions} />
  );

  expect(getByText(alerts[0].message)).not.toBeFalsy();
  expect(container).toMatchSnapshot();
});

it('should call remove on close button click', async function () {
  const { container, getByLabelText } = render(
    <Alert alerts={alerts} actions={actions} />
  );

  const user = userEvent.setup();
  await user.click(getByLabelText('Close Alert'));

  expect(mockFn).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});

it('should expand alert on click', async function () {
  const { container, getByText } = render(
    <Alert alerts={alerts} actions={actions} />
  );

  expect(container).toMatchSnapshot();

  const user = userEvent.setup();
  await user.click(getByText('Details'));

  expect(container).toMatchSnapshot();
});
