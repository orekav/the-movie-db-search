import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from './SearchBar';

test('AC1 - When a user first lands on the page, they are presented with a search input field and a search button', async () => {
  const { getByTestId } = render(<SearchBar />);
  const input = getByTestId("search-bar-input")
  const button = getByTestId("search-bar-button")
  expect(input).toBeTruthy()
  expect(button).toBeTruthy()
});
