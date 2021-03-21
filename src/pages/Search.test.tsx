import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Search from './Search';

const renderWithRouter = (element: JSX.Element) => render(
  <MemoryRouter>
    {element}
  </MemoryRouter>
);

test('AC2 - When a user first lands on the page, the search input field has focus', async () => {
  const { getByTestId } = renderWithRouter(<Search />);
  const input = getByTestId('search-bar-input')
  expect(input).toHaveFocus()
});
