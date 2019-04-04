import React from 'react';

import { List } from '../lib';

it('should render with minimum props', function() {
  const component = shallow(<List />);

  expect(component.is('ul')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should render children', function() {
  const component = shallow(
    <List>
      <li />
      <li />
      <li />
    </List>
  );

  expect(component.find('li').length).toEqual(3);
  expect(component).toMatchSnapshot();
});

it('should apply wrapping style', function() {
  const component = shallow(
    <List shouldWrap>
      <li />
      <li />
      <li />
    </List>
  );

  expect(component.is('.list--wrap')).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should apply columns style', function() {
  const component = shallow(
    <List columns={1}>
      <li />
      <li />
      <li />
    </List>
  );

  expect(component.is('.list--column')).toBe(true);
  expect(component.is('.list--wrap')).toBe(false);

  component.setProps({ columns: 2 });

  expect(component.is('.list--column')).toBe(true);
  expect(component.is('.list--wrap')).toBe(true);
  expect(component).toMatchSnapshot();
});
