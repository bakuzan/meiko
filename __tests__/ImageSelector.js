import fetchMock from 'fetch-mock';
import React from 'react';
import { act } from 'react-testing-library';

import { ImageSelector } from '../lib';

jest.mock('../lib/utils', () => ({
  convertToBase64: (_, cb) => cb({ target: { result: 'base64string' } }),
  isString: (s) => typeof s === 'string'
}));

const mockedChangeFn = jest.fn();
const mockedErrorFn = jest.fn();

function setup(success = true, error) {
  fetchMock
    .restore()
    .post(/image/, () => new Promise((resolve) => resolve({ success, error })));
}

afterEach(() => {
  mockedChangeFn.mockClear();
  mockedErrorFn.mockClear();
});
afterAll(() => jest.restoreAllMocks());

it('should render with minimum props', function() {
  const component = shallow(<ImageSelector onChange={mockedChangeFn} />);

  expect(component.is('.image-selector')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should show url display', function() {
  const component = shallow(
    <ImageSelector url="fakeurlhere" onChange={mockedChangeFn} />
  );

  expect(component.exists('.image-selector__value-display')).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should toggle url display', function() {
  const component = shallow(
    <ImageSelector url="fakeurlhere" onChange={mockedChangeFn} />
  );

  expect(component.exists('.image-selector__controls')).toBe(false);

  component.find('.image-selector__show-controls').prop('onClick')();

  expect(component.exists('.image-selector__controls')).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should call on change for file selection', async function() {
  setup();
  const file = new File([''], 'jest.txt');

  const component = shallow(<ImageSelector onChange={mockedChangeFn} />);

  await act(async () => {
    component.find('FileUploader').prop('onFileSelect')({
      target: { files: [file] }
    });
  });

  expect(mockedChangeFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});

it('should call on change for url upload button click', async function() {
  setup();
  const component = shallow(<ImageSelector onChange={mockedChangeFn} />);

  await act(async () => {
    component.find('ClearableInput').prop('onChange')({
      target: { value: 'aurlhere' }
    });

    component.find('.image-selector__upload-url').prop('onClick')();
  });

  expect(mockedChangeFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});

it('should call on error for failed upload', async function() {
  setup(false, 'jest test expected error');
  const component = shallow(
    <ImageSelector onChange={mockedChangeFn} onError={mockedErrorFn} />
  );

  await act(async () => {
    component.find('ClearableInput').prop('onChange')({
      target: { value: 'aurlhere' }
    });
    component.find('.image-selector__upload-url').prop('onClick')();
  });

  expect(mockedErrorFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});
