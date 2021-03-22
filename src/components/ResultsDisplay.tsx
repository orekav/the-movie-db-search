import { Table } from 'react-bootstrap';
import { MultiSearchCommonProperties, PersonCredits, CreditMember, MediaType } from '../types/tmdbAPI';
import ResultsDisplayRow from './ResultsDisplayRow'

type ResultsDisplayProps = {
  data?: (MultiSearchCommonProperties | PersonCredits | CreditMember)[]
  mediaType?: MediaType
}

const ResultsDisplay = ({ data, mediaType }: ResultsDisplayProps) => {
  if (!data) return null

  const noResults = (
    <tbody data-testid='result-display-table-row-no-results'>
      <tr>
        <td colSpan={5} align={'center'}>No matching results</td>
      </tr>
    </tbody>
  )

  const results = (
    <tbody data-testid='result-display-table-row-results'>
      {
        data.map((media, index) => (
          <ResultsDisplayRow
            data-testid={`result-display-table-row-${media.media_type}-${media.id}`}
            key={`${media.media_type}-${media.id}-${index}`}
            media={media}
            mediaType={mediaType}
          />
        ))
      }
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
          <th>More Details</th>
        </tr>
      </thead>
      {
        data.length ? results : noResults
      }
    </Table>
  )

}

export default ResultsDisplay;
