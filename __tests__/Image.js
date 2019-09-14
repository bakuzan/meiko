import React from 'react';

import { Image, Urls } from '../lib';
import { act } from 'react-testing-library';

let trggerIntersection = null;
const observeMock = {
  observe: jest.fn(),
  disconnect: jest.fn()
};

beforeEach(() => {
  observeMock.observe.mockReset();
  observeMock.disconnect.mockReset();

  global.IntersectionObserver = class {
    constructor(fn) {
      trggerIntersection = fn;
      return observeMock;
    }
  };
});

it('should render with minimum props', function() {
  const component = shallow(<Image src="fakeimage" alt="jest" />);

  expect(component.is('img')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should update src with dead image onError', function() {
  const component = shallow(<Image src="fakeimage" alt="jest" />);

  expect(component.find('img').prop('src')).toEqual('fakeimage');

  component.find('img').prop('onError')();

  expect(component.find('img').prop('src')).toEqual(Urls.images.deadImage);
  expect(component).toMatchSnapshot();
});

xit('should delay source until intersect if lazy', function() {
  const component = mount(<Image isLazy src="fakeimage" alt="jest" />);

  expect(component.find('img').prop('src')).toEqual(null);
  expect(observeMock.observe).toHaveBeenCalled();

  act(() => {
    // trigger intersection
    const entry = { isIntersecting: true };
    const ob = observeMock;
    trggerIntersection([entry], ob);
  });

  expect(component.find('img').prop('src')).toEqual('fakeimage');
  expect(component).toMatchSnapshot();
});
