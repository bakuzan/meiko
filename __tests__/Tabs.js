import React from 'react';

import { Tabs } from '../lib';

it('should render with minimum props', function () {
  const { container, getByText } = render(
    <Tabs.Container>
      <Tabs.View name="one">
        <div>this is the first tab...</div>
      </Tabs.View>
      <Tabs.View name="two">
        <div>...and this is another tab</div>
      </Tabs.View>
    </Tabs.Container>
  );

  expect(getByText('this is the first tab...')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should change active tab', async function () {
  const { container, getByText } = render(
    <Tabs.Container>
      <Tabs.View name="one">
        <div>this is the first tab...</div>
      </Tabs.View>
      <Tabs.View name="two">
        <div>...and this is another tab</div>
      </Tabs.View>
    </Tabs.Container>
  );

  expect(container).toMatchSnapshot();

  const user = userEvent.setup();
  await user.click(getByText('two'));

  expect(container).toMatchSnapshot();
});

it('should pass isActive if child is function', async function () {
  const { container, getByText, queryByText } = render(
    <Tabs.Container>
      <Tabs.View name="one">
        {(isActive) =>
          isActive && <div id="jest">this is the first tab...</div>
        }
      </Tabs.View>
      <Tabs.View name="two">
        <div>...and this is another tab</div>
      </Tabs.View>
    </Tabs.Container>
  );

  expect(getByText('this is the first tab...')).toBeTruthy();

  const user = userEvent.setup();
  await user.click(getByText('two'));

  expect(queryByText('this is the first tab...')).toBeNull();
  expect(container).toMatchSnapshot();
});
