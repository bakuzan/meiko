import React from 'react';

import { RatingControl } from '../lib';

const mockedChangeFn = jest.fn();

it('should render with minimum props', function() {
  const component = shallow(<RatingControl id="jest" value={0} />);

  expect(component.is('.rating-control')).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should call onChange', function() {
  const clickEvent = { target: { value: '5', type: 'radio' } };
  const component = shallow(
    <RatingControl id="jest" value={0} onChange={mockedChangeFn} />
  );

  component
    .find('.rating-control__input')
    .at(4)
    .simulate('click', clickEvent);

  expect(mockedChangeFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});

it('should return value of 0 if active value is selected', function() {
  const clickEvent = { target: { value: '5', type: 'radio' } };
  const component = shallow(
    <RatingControl id="jest" value={5} onChange={mockedChangeFn} />
  );

  component
    .find('.rating-control__input')
    .at(4)
    .simulate('click', clickEvent);

  expect(mockedChangeFn).toHaveBeenCalledWith({
    target: {
      type: 'radio',
      value: 0,
      name: undefined
    }
  });
  expect(component).toMatchSnapshot();
});

it('should render "maxRating" number of inputs', function() {
  const component = shallow(
    <RatingControl id="jest" value={0} onChange={mockedChangeFn} />
  );

  // Default prop
  expect(component.find('.rating-control__input').length).toEqual(10);

  component.setProps({ maxRating: 3 });
  expect(component.find('.rating-control__input').length).toEqual(3);
  expect(component).toMatchSnapshot();

  component.setProps({ maxRating: 15 });
  expect(component.find('.rating-control__input').length).toEqual(15);
  expect(component).toMatchSnapshot();
});
