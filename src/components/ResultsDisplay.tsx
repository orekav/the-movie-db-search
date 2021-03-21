import { Table } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { MultiSearchCommonProperties, SearchMovie, SearchPerson, SearchTV, PersonCredits, CreditMember } from '../models/tmdbAPI';

const generateRow = (media: MultiSearchCommonProperties | PersonCredits | CreditMember, index: number) => {
  switch (media.media_type) {
    case 'movie': return movieRow(media as SearchMovie, index)
    case 'tv': return tvRow(media as SearchTV, index)
    case 'person': return personRow(media as SearchPerson, index)
    default: return null
  }
}

const isAdult = (value?: boolean) => {
  if (value === true) return 'Yes'
  if (value === false) return 'No'
  return 'Unknown'
}

type getLinkParams = {
  id?: number;
  media_type: string;
}
const getLink = ({media_type, id}: getLinkParams) =>
  id ? `/${media_type}/${id}` : null

type CommonRow = {
  key: string;
  IconElement: Icon.Icon;
  name?: string;
  popularity?: number
  adult?: boolean
  link: string | null,
  index: number
}

const commonRow = ({ IconElement, name, popularity, adult, key, link, index }: CommonRow) =>
  <tr
    data-testid={`result-display-table-row-${key}`}
    key={`${key}-${index}`}
  >
    <td align={'center'}><IconElement /></td>
    <td align={'left'}>{name}</td>
    <td align={'center'}>{popularity}</td>
    <td align={'center'}>{isAdult(adult)}</td>
    <td align={'center'}>{link && <Link to={link}>Details</Link>}</td>
  </tr>

const personRow = (media: SearchPerson, index: number) => commonRow({
  key: `${media.media_type}-${media.id}`,
  IconElement: Icon.PersonLinesFill,
  name: media.name,
  popularity: media.popularity,
  adult: media.adult,
  link: getLink(media),
  index,
})

const movieRow = (media: SearchMovie, index: number) => commonRow({
  key: `${media.media_type}-${media.id}`,
  IconElement: Icon.Film,
  name: media.title || media.original_title,
  popularity: media.popularity,
  adult: media.adult,
  link: getLink(media),
  index,
})

const tvRow = (media: SearchTV, index: number) => commonRow({
  key: `${media.media_type}-${media.id}`,
  IconElement: Icon.Tv,
  name: media.name || media.original_name,
  popularity: media.popularity,
  adult: media.adult,
  link: getLink(media),
  index,
})

type ResultsDisplayProps = {
  data?: (MultiSearchCommonProperties | PersonCredits | CreditMember )[]
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
      {data.map((generateRow))}
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
