import React from 'react';

import { AppInformation } from '../lib';

it('should render null when no props', function () {
  const { container } = render(<AppInformation branch="" version="" />);
  expect(container.firstChild).toBeNull();
});

it('should render when branch present', function () {
  const spanContent = ['Branch: master'];
  const { container, getByText } = render(<AppInformation branch="master" />);

  expect(container).not.toBeNull();

  spanContent.forEach((content) => expect(getByText(content)).toBeTruthy());

  expect(container).toMatchSnapshot();
});

it('should render when version present', function () {
  const spanContent = ['Version: 4.0.0'];
  const { container, getByText } = render(<AppInformation version="4.0.0" />);

  expect(container).not.toBeNull();

  spanContent.forEach((content) => expect(getByText(content)).toBeTruthy());

  expect(container).toMatchSnapshot();
});

it('should render both', function () {
  const spanContent = ['Branch: master', 'Version: 4.0.0'];
  const { container, getByText } = render(
    <AppInformation branch="master" version="4.0.0" />
  );

  expect(container).not.toBeNull();

  spanContent.forEach((content) => expect(getByText(content)).toBeTruthy());

  expect(container).toMatchSnapshot();
});
