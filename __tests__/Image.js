import React from 'react';

import { Image, Urls } from '../lib';
import { act } from '@testing-library/react';

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

it('should render with minimum props', function () {
  const { container } = render(<Image src="fakeimage" alt="jest" />);

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should update src with dead image onError', function () {
  const { container, getByAltText } = render(
    <Image src="fakeimage" alt="jest" />
  );
  const imageElement = getByAltText('jest');

  expect(imageElement.src.includes('fakeimage')).toBe(true);

  fireEvent.error(imageElement);

  expect(imageElement.src).toEqual(Urls.images.deadImage);
  expect(container).toMatchSnapshot();
});

xit('should delay source until intersect if lazy', function () {
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
