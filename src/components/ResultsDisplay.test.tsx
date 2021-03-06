import { render, RenderResult } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { SearchMovie, SearchPerson, SearchTV } from '../types/tmdbAPI'
import ResultsDisplay from './ResultsDisplay'

const searchData: (SearchMovie | SearchPerson | SearchTV)[] =[
  { media_type: 'person', adult: false, name: 'Bryan Cranston', id: 1, popularity: 100 },
  { media_type: 'tv', adult: true, name: 'Breaking Bad', id: 2, popularity: 99 },
  { media_type: 'movie', adult: undefined, title: 'El Camino: A Breaking Bad Movie', id: 3, popularity: 78 },
  { media_type: 'invalid', adult: undefined, title: 'Invalid', id: 1, popularity: 37 },
]

const renderWithRouter = (element: JSX.Element) => render(
  <MemoryRouter>
    {element}
  </MemoryRouter>
);

const getRowKey = (mediaType: string, id?: number) => `result-display-table-row-${mediaType}-${id}`

describe('AC6 - Upon initiating a search, the user is presented with the search results.', () => {

  it('should not display results table', () => {
    const { container } = renderWithRouter(<ResultsDisplay />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should display message informing no matching results', () => {
    const { getByTestId } = renderWithRouter(<ResultsDisplay data={[]} />)
    const noResults = getByTestId('result-display-table-row-no-results')
    expect(noResults).not.toBeEmptyDOMElement()
  })

  it('should display results table', async () => {
    const { getByTestId } = renderWithRouter(<ResultsDisplay data={searchData} />)
    const results = getByTestId('result-display-table-row-results')
    expect(results).not.toBeEmptyDOMElement()
  })

  describe('displaying search results suite', () => {
    let rendered: RenderResult

    beforeEach(() => {
      rendered = renderWithRouter(<ResultsDisplay data={searchData} />)
    })

    it('should display a person', async () => {
      const { getByTestId } = rendered
      const searchObject = searchData.find(r => r.media_type === 'person')! as SearchPerson
      const testId = getRowKey(searchObject.media_type, searchObject.id)

      const result = getByTestId(testId)

      expect(result).toHaveTextContent(searchObject.name!)
      expect(result).toHaveTextContent(searchObject.popularity!.toString())
      expect(result).toHaveTextContent('No')
    })

    it('should display a tv', async () => {
      const { getByTestId } = rendered
      const searchObject = searchData.find(r => r.media_type === 'tv')! as SearchTV
      const testId = getRowKey(searchObject.media_type, searchObject.id)

      const result = getByTestId(testId)

      expect(result).toHaveTextContent(searchObject.name! || searchObject.original_name!)
      expect(result).toHaveTextContent(searchObject.popularity!.toString())
      expect(result).toHaveTextContent('Yes')
    })

    it('should display a movie', async () => {
      const { getByTestId } = rendered
      const searchObject = searchData.find(r => r.media_type === 'movie')! as SearchMovie
      const testId = getRowKey(searchObject.media_type, searchObject.id)

      const result = getByTestId(testId)

      expect(result).toHaveTextContent(searchObject.title! || searchObject.original_title!)
      expect(result).toHaveTextContent(searchObject.popularity!.toString())
      expect(result).toHaveTextContent('Unknown')
    })

    it('should not display invalid mediaType', async () => {
      const { container } = rendered
      const searchObject = searchData.find(r => r.media_type === 'invalid')!

      expect(container).not.toHaveTextContent(searchObject.name!)
      expect(container).not.toHaveTextContent(searchObject.popularity!.toString())
    })

  })

})

