import React from 'react';

import { Tickbox } from '../lib';

const mockedChangeFn = jest.fn();

it('should render with minimum props', function() {
  const component = shallow(
    <Tickbox id="jest" checked={false} onChange={mockedChangeFn} />
  );

  expect(component.is('.tickbox')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should toggle checkbox on click', function() {
  const changeEvent = { target: { checked: true } };
  const component = shallow(
    <Tickbox id="jest" checked={false} onChange={mockedChangeFn} />
  );

  expect(component.find('input').prop('checked')).toBe(false);

  component.find('input').simulate('change', changeEvent);

  expect(mockedChangeFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});
