import React from 'react';

import { FileUploader } from '../lib';

const mockedFileSelectFn = jest.fn();

it('should render with minimum props', function () {
  const { container } = render(
    <FileUploader
      id="file"
      name="file"
      value=""
      onFileSelect={mockedFileSelectFn}
    />
  );

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should call onFileSelect when changed', function () {
  const { container, getByPlaceholderText } = render(
    <FileUploader
      id="file"
      name="file"
      value=""
      onFileSelect={mockedFileSelectFn}
    />
  );

  fireEvent.change(getByPlaceholderText('upload'), {
    stopPropagation: () => null
  });

  expect(mockedFileSelectFn).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});
