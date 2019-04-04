import React from 'react';

import { FileUploader } from '../lib';

const mockedFileSelectFn = jest.fn();

it('should render with minimum props', function() {
  const component = shallow(
    <FileUploader
      id="file"
      name="file"
      value=""
      onFileSelect={mockedFileSelectFn}
    />
  );

  expect(component.is('.file-uploader')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should call onFileSelect when changed', function() {
  const component = shallow(
    <FileUploader
      id="file"
      name="file"
      value=""
      onFileSelect={mockedFileSelectFn}
    />
  );

  component.find('.file-uploader__input').prop('onChange')({
    stopPropagation: () => null
  });

  expect(mockedFileSelectFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});
