import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SearchBar from './SearchBar';

const renderWithRouter = (element: JSX.Element) => render(
  <MemoryRouter>
    {element}
  </MemoryRouter>
);

test('AC1 - When a user first lands on the page, they are presented with a search input field and a search button', () => {
  const { getByTestId } = renderWithRouter(<SearchBar />);
  const input = getByTestId('search-bar-input')
  const button = getByTestId('search-bar-button')
  expect(input).toBeTruthy()
  expect(button).toBeTruthy()
});

test('AC3 - A user may type any text into the search input field then click on the search button to initiate a search.', async () => {
  const searchHandler = jest.fn()
  const { getByTestId } = renderWithRouter(<SearchBar handleSearch={searchHandler} />);
  const input = getByTestId('search-bar-input')
  const button = getByTestId('search-bar-button')

  fireEvent.change(input, { target: { value: 'Sky UK' } })
  fireEvent.click(button)
  expect(searchHandler).toHaveBeenCalledTimes(1)
  expect(searchHandler).toHaveBeenCalledWith('multi', 'Sky UK')
})

test('AC4 - A user may type any text into the search input field then press the enter key to initiate a search.', async () => {
  const searchHandler = jest.fn()
  const { getByTestId } = renderWithRouter(<SearchBar handleSearch={searchHandler} />);
  const input = getByTestId('search-bar-input')

  fireEvent.change(input, { target: { value: 'Sky UK' } })
  // https://github.com/testing-library/react-testing-library/issues/269#issuecomment-455854112
  fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 })
  expect(searchHandler).toHaveBeenCalledTimes(1)
  expect(searchHandler).toHaveBeenCalledWith('multi', 'Sky UK')
})