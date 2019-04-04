import React from 'react';

import { Grid } from '../lib';

it('should render with minimum props', function() {
  const component = shallow(<Grid />);

  expect(component.is('ul')).toBeTruthy();
  expect(component.find('li').length).toBe(0);
  expect(component).toMatchSnapshot();
});

it('should render "no items" message', function() {
  const component = shallow(<Grid items={[]} />);

  expect(component.exists('.mko-grid__no-items')).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should render custom "no items" message', function() {
  const customText = 'Jest No Items';
  const component = shallow(<Grid items={[]} noItemsText={customText} />);

  expect(component.exists('.mko-grid__no-items')).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should NOT render "no items" message', function() {
  const component = shallow(<Grid items={[]} noItemsText={false} />);

  expect(component.exists('.mko-grid__no-items')).toBe(false);
  expect(component).toMatchSnapshot();
});

it('should render items using children render props', function() {
  const component = shallow(
    <Grid items={['jest', 'enzyme', 'react']} noItemsText={false}>
      {(item) => <li key={item}>{item}</li>}
    </Grid>
  );

  expect(component.find('li').length).toEqual(3);
  expect(component).toMatchSnapshot();
});
