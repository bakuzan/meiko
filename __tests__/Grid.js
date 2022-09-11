import React from 'react';

import { Grid } from '../lib';

it('should render with minimum props', function () {
  const { container } = render(<Grid />);

  expect(container.firstChild).not.toBeNull();
  expect(container).toMatchSnapshot();
});

it('should render "no items" message', function () {
  const { container, getByText } = render(<Grid items={[]} />);

  expect(getByText('No items were found.')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should render custom "no items" message', function () {
  const customText = 'Jest No Items';
  const { container, getByText } = render(
    <Grid items={[]} noItemsText={customText} />
  );

  expect(getByText(customText)).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should NOT render "no items" message', function () {
  const { container, queryByText } = render(
    <Grid items={[]} noItemsText={false} />
  );

  expect(queryByText('No items were found.')).toBeNull();
  expect(container).toMatchSnapshot();
});

it('should render items using children render props', function () {
  const items = ['jest', 'enzyme', 'react'];
  const { container, getByText } = render(
    <Grid items={items} noItemsText={false}>
      {(item) => <li key={item}>{item}</li>}
    </Grid>
  );

  items.forEach((word) => expect(getByText(word)).toBeTruthy());

  expect(container).toMatchSnapshot();
});
