import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import TVDetails from './TVDetails';
import {
  TV,
  TVCredits,
} from '../types/tmdbAPI';

const renderWithRouter = (element: JSX.Element) => render(
  <MemoryRouter>
    {element}
  </MemoryRouter>
);

jest.mock(
  '../services/tmdbAPI',
  () => ({
    getTVById: (id: number) => Promise.resolve(({ name: 'Breaking Bad', overview: 'Blue stuff' } as TV)),
    getTVCredits: (id: number) => Promise.resolve(({ cast: [] } as TVCredits))
  })
)

describe('AC8 - The details page will show a full list of cross referential data,', () => {

  it('should show Breaking Bad details', async () => {
    const { getByTestId } = renderWithRouter(<TVDetails />);
    await waitFor(() => {
      const name = getByTestId('tv-details-name')
      const overview = getByTestId('tv-details-overview')
      expect(name).toHaveTextContent('Breaking Bad')
      expect(overview).toHaveTextContent('Blue stuff')
    })
  })

});
