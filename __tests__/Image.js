import React from 'react';

import { Image, Urls } from '../lib';

beforeEach(() => {
  const observeMock = {
    observe: jest.fn(),
    disconnect: jest.fn()
  };

  window.IntersectionObserver = () => observeMock;
});

it('should render with minimum props', function() {
  const component = shallow(<Image src="fakeimage" alt="jest" />);

  expect(component.is('img')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

xit('should update src with dead image onError', function() {
  const component = shallow(<Image src="fakeimage" alt="jest" />);

  expect(component.find('img').prop('src')).toEqual('fakeimage');

  component.find('img').prop('onError')({
    target: component.find('img').instance()
  });

  expect(component.find('img').prop('src')).toEqual(Urls.images.deadImage);
  expect(component).toMatchSnapshot();
});

xit('should delay source until intersect if lazy', function() {
  const component = shallow(<Image isLazy src="fakeimage" alt="jest" />);

  expect(component.find('img').prop('src')).toEqual(undefined);

  // trigger intersection

  expect(component.find('img').prop('src')).toEqual('fakeimage');
  expect(component).toMatchSnapshot();
});
