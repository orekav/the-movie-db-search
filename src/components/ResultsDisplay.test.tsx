import { render, RenderResult } from '@testing-library/react'
import { SearchMovie, SearchPerson, SearchTV } from '../models/tmdbAPI'
import { TMDBResponse } from '../services/tmdbAPI'
import ResultsDisplay from './ResultsDisplay'

const searchData: TMDBResponse<SearchMovie | SearchPerson | SearchTV> = {
  results: [
    { media_type: 'person', adult: false, name: 'Bryan Cranston', id: 1, popularity: 100 },
    { media_type: 'tv', adult: true, name: 'Breaking Bad', id: 1, popularity: 100 },
    { media_type: 'movie', adult: undefined, title: 'El Camino: A Breaking Bad Movie', id: 1, popularity: 100 },
  ]
}

const getRowKey = (mediaType: string, id?: number) => `result-display-table-row-${mediaType}-${id}`

describe.only('AC6 - Upon initiating a search, the user is presented with the search results.', () => {

  it('should not display results table', () => {
    const { container } = render(<ResultsDisplay />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should display message informing no matching results', () => {
    const { getByTestId } = render(<ResultsDisplay data={{ results: [] }} />)
    const noResults = getByTestId('result-display-table-row-no-results')
    expect(noResults).not.toBeEmptyDOMElement()
  })

  it('should display results table', async () => {
    const { getByTestId } = render(<ResultsDisplay data={searchData} />)
    const results = getByTestId('result-display-table-row-results')
    expect(results).not.toBeEmptyDOMElement()
  })

  describe('displaying search results suite', () => {
    let rendered: RenderResult

    beforeEach(() => {
      rendered = render(<ResultsDisplay data={searchData} />)
    })

    it('should display a person', async () => {
      const { getByTestId } = rendered
      const searchObject = searchData.results.find(r => r.media_type === 'person')! as SearchPerson
      const testId = getRowKey(searchObject.media_type, searchObject.id)

      const result = getByTestId(testId)

      expect(result).toHaveTextContent(searchObject.name!)
      expect(result).toHaveTextContent(searchObject.popularity!.toString())
      expect(result).toHaveTextContent('No')
    })

    it('should display a tv', async () => {
      const { getByTestId } = rendered
      const searchObject = searchData.results.find(r => r.media_type === 'tv')! as SearchTV
      const testId = getRowKey(searchObject.media_type, searchObject.id)

      const result = getByTestId(testId)

      expect(result).toHaveTextContent(searchObject.name! || searchObject.original_name!)
      expect(result).toHaveTextContent(searchObject.popularity!.toString())
      expect(result).toHaveTextContent('Yes')
    })

    it('should display a movie', async () => {
      const { getByTestId } = rendered
      const searchObject = searchData.results.find(r => r.media_type === 'movie')! as SearchMovie
      const testId = getRowKey(searchObject.media_type, searchObject.id)

      const result = getByTestId(testId)

      expect(result).toHaveTextContent(searchObject.title! || searchObject.original_title!)
      expect(result).toHaveTextContent(searchObject.popularity!.toString())
      expect(result).toHaveTextContent('Unknown')
    })

  })

})

