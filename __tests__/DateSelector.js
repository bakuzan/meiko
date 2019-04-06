import React from 'react';

import { DateSelector } from '../lib';

const mockedChangeFn = jest.fn();

it('should render with minimum props', function() {
  const component = shallow(<DateSelector id="jest" value="2019-04-05" />);

  expect(component.is('.date-selector')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should render standard view', function() {
  const component = shallow(<DateSelector id="jest" value="2019-04-05" />);

  expect(component.exists('ClearableInput')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should render flat view', function() {
  const component = shallow(
    <DateSelector isFlat id="jest" value="2019-04-05" />
  );

  expect(component.exists('ClearableInput')).toBeFalsy();
  expect(component.exists('Calendar')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should open calendar', function() {
  const component = shallow(<DateSelector id="jest" value="2019-04-05" />);

  expect(component.exists('Calendar')).toBeFalsy();

  component.find('.date-selector__open').prop('onClick')();

  expect(component.exists('Calendar')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should call onChange when clear is clicked', function() {
  const component = shallow(
    <DateSelector id="jest" value="2019-04-05" onChange={mockedChangeFn} />
  );

  component.find('.date-selector__clear').prop('onClick')();

  expect(mockedChangeFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});

it('should not display clear button when value required', function() {
  const component = shallow(
    <DateSelector
      id="jest"
      value="2019-04-05"
      required
      onChange={mockedChangeFn}
    />
  );

  expect(component.exists('.date-selector__clear')).toBeFalsy();
  expect(component).toMatchSnapshot();
});
