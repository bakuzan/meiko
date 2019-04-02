import React from 'react';

import {
  LoadingBouncer,
  LoadingSpinner,
  LoadableContent,
  SimpleLoading,
  Loading
} from '../lib';

jest.useFakeTimers();

describe('LoadingBouncer', function() {
  it('should render with minimum props', function() {
    const component = shallow(<LoadingBouncer />);

    expect(component.is('.loading-bouncer')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});

describe('LoadingSpinner', function() {
  it('should render with minimum props', function() {
    const component = shallow(<LoadingSpinner />);

    expect(component.is('.loader')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});

describe('SimpleLoading', function() {
  it('should render with minimum props', function() {
    const component = shallow(<SimpleLoading />);

    expect(component.html()).toBeNull();
  });

  it('should render', function() {
    const component = shallow(<SimpleLoading pastDelay={true} />);

    expect(component.is('.loading-bouncer')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});

describe('Loading', function() {
  it('should render with minimum props', function() {
    const component = shallow(<Loading />);

    expect(component.html()).toBeNull();
  });

  it('should render', function() {
    const component = shallow(<Loading pastDelay={true} />);

    expect(component.is('.loader')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('should render error message', function() {
    const component = shallow(<Loading error={true} />);

    expect(component.text()).toEqual(
      'An Error was encountered loading the page!'
    );
    expect(component).toMatchSnapshot();
  });

  it('should render timeout message', function() {
    const component = shallow(<Loading timedOut={true} />);

    expect(component.text()).toEqual('The request has timed out!');
    expect(component).toMatchSnapshot();
  });
});

describe('LoadableContent', function() {
  it('should render with minimum props', function() {
    const component = shallow(
      <LoadableContent>
        <div id="jest" />
      </LoadableContent>
    );

    expect(component.find('#jest').exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should render spinner after timeout', function() {
    const component = shallow(
      <LoadableContent isFetching={false}>
        <div id="jest" />
      </LoadableContent>
    );

    expect(component.state('pastDelay')).toBe(false);

    component.setProps({ isFetching: true });
    jest.runAllTimers();

    expect(component.state('pastDelay')).toBe(true);
    expect(component.is('.loader')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});
