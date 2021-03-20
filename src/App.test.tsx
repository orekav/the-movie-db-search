import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('AC2 - When a user first lands on the page, the search input field has focus', async () => {
  const { getByTestId } = render(<App />);
  const input = getByTestId("search-bar-input")
  expect(input).toHaveFocus()
});
