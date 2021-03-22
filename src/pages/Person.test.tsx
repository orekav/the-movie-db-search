import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PersonDetails from './PersonDetails';
import {
  Person,
  PersonParticipations,
} from '../types/tmdbAPI';

const renderWithRouter = (element: JSX.Element) => render(
  <MemoryRouter>
    {element}
  </MemoryRouter>
);

jest.mock(
  '../services/tmdbAPI',
  () => ({
    getPersonById: (id: number) => Promise.resolve(({ name: 'Bryan Cranston', biography: 'He is an actor' } as Person)),
    getPersonCombinedCredits: (id: number) => Promise.resolve(({ cast: [] } as PersonParticipations))
  })
)

describe('AC8 - The details page will show a full list of cross referential data,', () => {

  it('should show Bryan Cranston details', async () => {
    const { getByTestId } = renderWithRouter(<PersonDetails />);
    await waitFor(() => {
      const name = getByTestId('person-details-name')
      const biography = getByTestId('person-details-biography')
      expect(name).toHaveTextContent('Bryan Cranston')
      expect(biography).toHaveTextContent('He is an actor')
    })
  })

});
