import { render } from '@testing-library/react';
import Search from './Search';

test('AC2 - When a user first lands on the page, the search input field has focus', async () => {
  const { getByTestId } = render(<Search />);
  const input = getByTestId('search-bar-input')
  expect(input).toHaveFocus()
});
