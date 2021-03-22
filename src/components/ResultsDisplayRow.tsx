import { Link } from 'react-router-dom';
import { MultiSearchCommonProperties, SearchMovie, SearchPerson, SearchTV, PersonCredits, CreditMember, MediaType } from '../types/tmdbAPI';
import { getIconByMediaType } from '../helpers/mediaType'

const isAdult = (value?: boolean) => {
  if (value === true) return 'Yes'
  if (value === false) return 'No'
  return 'Unknown'
}

type getLinkParams = {
  id?: number;
  media_type: string;
}
const getLink = ({ media_type, id }: getLinkParams) =>
  id ? `/${media_type}/${id}` : null

type CommonRow = {
  mediaType: MediaType;
  name?: string;
  popularity?: number;
  adult?: boolean;
  link: string | null;
  props: any;
}

const commonRow = ({ mediaType, name, popularity, adult, link, props }: CommonRow) =>
  <tr {...props}>
    <td align={'center'}>{getIconByMediaType(mediaType)}</td>
    <td align={'left'}>{name}</td>
    <td align={'center'}>{popularity}</td>
    <td align={'center'}>{isAdult(adult)}</td>
    <td align={'center'}>{link && <Link to={link}>Details</Link>}</td>
  </tr>

const personRow = (media: SearchPerson, props: any) => commonRow({
  mediaType: media.media_type,
  name: media.name,
  popularity: media.popularity,
  adult: media.adult,
  link: getLink(media),
  props,
})

const movieRow = (media: SearchMovie, props: any) => commonRow({
  mediaType: media.media_type,
  name: media.title || media.original_title,
  popularity: media.popularity,
  adult: media.adult,
  link: getLink(media),
  props,
})

const tvRow = (media: SearchTV, props: any) => commonRow({
  mediaType: media.media_type,
  name: media.name || media.original_name,
  popularity: media.popularity,
  adult: media.adult,
  link: getLink(media),
  props,
})

type ResultsDisplayRowProps = {
  media: MultiSearchCommonProperties | PersonCredits | CreditMember;
  mediaType?: MediaType;
}

const ResultsDisplayRow = ({ media, mediaType, ...props }: ResultsDisplayRowProps) => {
  switch (media.media_type || mediaType) {
    case 'movie': return movieRow(media as SearchMovie, props)
    case 'tv': return tvRow(media as SearchTV, props)
    case 'person': return personRow(media as SearchPerson, props)
    default: return null
  }
}

export default ResultsDisplayRow