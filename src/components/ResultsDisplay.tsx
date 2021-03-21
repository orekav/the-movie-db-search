import { Table } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { MultiSearchCommonProperties, SearchMovie, SearchPerson, SearchTV } from '../models/tmdbAPI';
import { TMDBResponse } from '../services/tmdbAPI';

const generateRow = (media: MultiSearchCommonProperties) => {
  switch (media.media_type) {
    case 'movie': return movieRow(media as SearchMovie)
    case 'tv': return tvRow(media as SearchTV)
    case 'person': return personRow(media as SearchPerson)
    default: return null
  }
}

const isAdult = (value?: boolean) => {
  if (value === true) return 'Yes'
  if (value === false) return 'No'
  return 'Unknown'
}

type CommonRow = {
  key: string;
  IconElement: Icon.Icon;
  name?: string;
  popularity?: number
  adult?: boolean
}

const commonRow = ({ IconElement, name, popularity, adult, key }: CommonRow) =>
  <tr
    data-testid={`result-display-table-row-${key}`}
    key={key}
  >
    <td align={'center'}><IconElement /></td>
    <td align={'left'}>{name}</td>
    <td align={'center'}>{popularity}</td>
    <td align={'center'}>{isAdult(adult)}</td>
  </tr>

const personRow = (media: SearchPerson) => commonRow({
  key: `${media.media_type}-${media.id}`,
  IconElement: Icon.PersonLinesFill,
  name: media.name,
  popularity: media.popularity,
  adult: media.adult,
})

const movieRow = (media: SearchMovie) => commonRow({
  key: `${media.media_type}-${media.id}`,
  IconElement: Icon.Film,
  name: media.title || media.original_title,
  popularity: media.popularity,
  adult: media.adult,
})

const tvRow = (media: SearchTV) => commonRow({
  key: `${media.media_type}-${media.id}`,
  IconElement: Icon.Tv,
  name: media.name || media.original_name,
  popularity: media.popularity,
  adult: media.adult,
})

type ResultsDisplayProps = {
  data?: TMDBResponse<MultiSearchCommonProperties>
}

const ResultsDisplay = ({ data }: ResultsDisplayProps) => {
  if (!data) return null

  const noResults = (
    <tbody data-testid='result-display-table-row-no-results'>
      <tr>
        <td colSpan={4} align={'center'}>No matching results</td>
      </tr>
    </tbody>
  )

  const results = (
    <tbody data-testid='result-display-table-row-results'>
      {data.results.map(r => generateRow(r))}
    </tbody>
  )

  return (
    <Table
      striped
      bordered
      hover
      size='sm'
      responsive
    >
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Adult</th>
        </tr>
      </thead>
      {
        data.results.length ? results : noResults
      }
    </Table>
  )

}

export default ResultsDisplay;
