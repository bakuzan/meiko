import React from 'react';

import { Form } from '../lib';

const subOps = {
  onSubmit: jest.fn()
};

const canOps = {
  onCancel: jest.fn()
};

it('should render with minimum props', function() {
  const component = shallow(
    <Form name="jest" submitOptions={subOps} cancelOptions={canOps}>
      <div>Form Children</div>
    </Form>
  );

  expect(component.is('.mko-form')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should render children', function() {
  const component = shallow(
    <Form name="jest" submitOptions={subOps} cancelOptions={canOps}>
      <div id="jestChild">Form Children</div>
    </Form>
  );

  expect(component.find('#jestChild').exists()).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should render title if truthy', function() {
  const component = shallow(
    <Form name="jest" submitOptions={subOps} cancelOptions={canOps}>
      <div>Form Children</div>
    </Form>
  );

  expect(component.find('.mko-form__title').exists()).toBe(false);

  component.setProps({ title: 'jester' });

  expect(component.find('.mko-form__title').exists()).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should display custom submit button text', function() {
  const customText = 'Save - Jest';
  const component = mount(
    <Form name="jest" submitOptions={subOps} cancelOptions={canOps}>
      <div>Form Children</div>
    </Form>
  );

  expect(component.find('button.mko-form__submit').text()).toEqual('Save');

  component.setProps({ submitOptions: { ...subOps, text: customText } });

  expect(component.find('button.mko-form__submit').text()).toEqual(customText);
  expect(component).toMatchSnapshot();
  component.unmount();
});

it('should call onSubmit', function() {
  const component = mount(
    <Form name="jest" submitOptions={subOps} cancelOptions={canOps}>
      <div>Form Children</div>
    </Form>
  );

  component
    .find('.mko-form__form')
    .simulate('submit', { preventDefault: () => null });

  expect(subOps.onSubmit).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
  component.unmount();
});

it('should call onCancel', function() {
  const component = mount(
    <Form name="jest" submitOptions={subOps} cancelOptions={canOps}>
      <div>Form Children</div>
    </Form>
  );

  component.find('button.mko-form__cancel').simulate('click');

  expect(canOps.onCancel).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
  component.unmount();
});
