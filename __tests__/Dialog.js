import React from 'react';

import { Dialog } from '../lib';

const mockedActionFn = jest.fn();
const mockedCloseFn = jest.fn();

it('should render with minimum props', function() {
  const component = shallow(
    <Dialog name="jest" isOpen={false} onCancel={mockedCloseFn}>
      <div>jest</div>
    </Dialog>
  );

  expect(component.is('.dialog')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should open when passed new prop', function() {
  const component = shallow(
    <Dialog name="jest" isOpen={false} onCancel={mockedCloseFn}>
      <div>jest</div>
    </Dialog>
  );

  expect(component.prop('open')).toBe(false);

  component.setProps({ isOpen: true });

  expect(component.prop('open')).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should call onCancel when cancel button clicked', function() {
  const component = shallow(
    <Dialog name="jest" isOpen={true} onCancel={mockedCloseFn}>
      <div>jest</div>
    </Dialog>
  );

  component.find('.dialog__cancel').prop('onClick')();

  expect(mockedCloseFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});

it('should render action button and call onAction when clicked', function() {
  const component = shallow(
    <Dialog
      name="jest"
      isOpen={true}
      onAction={mockedActionFn}
      onCancel={mockedCloseFn}
    >
      <div>jest</div>
    </Dialog>
  );

  const actionBtn = component.find('.dialog__action');
  expect(actionBtn.exists()).toBe(true);

  actionBtn.prop('onClick')({ preventDefault: () => null });

  expect(mockedActionFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});

it('should only render title when passed', function() {
  const component = shallow(
    <Dialog
      name="jest"
      isOpen={true}
      onAction={mockedActionFn}
      onCancel={mockedCloseFn}
    >
      <div>jest</div>
    </Dialog>
  );

  const titleBefore = component.find('.dialog__title');
  expect(titleBefore.exists()).toBe(false);

  component.setProps({ title: 'jester!' });

  const titleAfter = component.find('.dialog__title');
  expect(titleAfter.exists()).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should replace form element with div', function() {
  const component = mount(
    <Dialog
      name="jest"
      isOpen={true}
      onAction={mockedActionFn}
      onCancel={mockedCloseFn}
    >
      <div>jest</div>
    </Dialog>
  );

  const form = component.find('.dialog-content');
  expect(form.type()).toEqual('form');

  component.setProps({ isForm: false });

  const formNowDiv = component.find('.dialog-content');
  expect(formNowDiv.type()).toEqual('div');
  expect(component).toMatchSnapshot();
  component.unmount();
});
