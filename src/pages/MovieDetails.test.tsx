import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import MovieDetails from './MovieDetails';
import {
  Movie,
  MovieCredits,
} from '../types/tmdbAPI';

const renderWithRouter = (element: JSX.Element) => render(
  <MemoryRouter>
    {element}
  </MemoryRouter>
);

jest.mock(
  '../services/tmdbAPI',
  () => ({
    getMovieById: (id: number) => Promise.resolve(({ title: 'El Camino: A Breaking Bad Movie', overview: 'Escaping to Alaska' } as Movie)),
    getMovieCredits: (id: number) => Promise.resolve(({ cast: [] } as MovieCredits))
  })
)

describe('AC8 - The details page will show a full list of cross referential data,', () => {

  it('should show El Camino details', async () => {
    const { getByTestId } = renderWithRouter(<MovieDetails />);
    await waitFor(() => {
      const title = getByTestId('movie-details-title')
      const overview = getByTestId('movie-details-overview')
      expect(title).toHaveTextContent('El Camino: A Breaking Bad Movie')
      expect(overview).toHaveTextContent('Escaping to Alaska')
    })
  })

});
