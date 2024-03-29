import fetchMock from 'fetch-mock';
import React from 'react';
import { act } from '@testing-library/react';

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

it('should render with minimum props', function () {
  const { container } = render(<ImageSelector onChange={mockedChangeFn} />);

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should show url display', function () {
  const { container, getByText } = render(
    <ImageSelector url="fakeurlhere" onChange={mockedChangeFn} />
  );

  expect(getByText('fakeurlhere')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should toggle url display', async function () {
  const { container, queryByLabelText, getByLabelText, getByText } = render(
    <ImageSelector url="fakeurlhere" onChange={mockedChangeFn} />
  );

  expect(queryByLabelText('Image Url')).toBeNull();

  const user = userEvent.setup();
  await user.click(getByText('upload new image'));

  expect(getByLabelText('Image Url')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

xit('should call on change for file selection', async function () {
  setup();
  const file = new File(['qwerty'], 'jest.txt');

  await act(async () => {
    const component = shallow(<ImageSelector onChange={mockedChangeFn} />);

    component.find('FileUploader').prop('onFileSelect')({
      target: { files: [file] }
    });
  });

  expect(mockedChangeFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});

xit('should call on change for url upload button click', async function () {
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

xit('should call on error for failed upload', async function () {
  setup(false, 'jest test expected error');
  const component = shallow(
    <ImageSelector onChange={mockedChangeFn} onError={mockedErrorFn} />
  );

  await act(async () => {
    component.find('ClearableInput').prop('onChange')({
      target: { value: 'value that will fa' }
    });
    component.find('.image-selector__upload-url').prop('onClick')();
  });

  expect(mockedErrorFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});
