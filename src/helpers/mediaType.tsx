import { Film, PersonLinesFill, QuestionCircle, Tv } from "react-bootstrap-icons"
import { MediaType } from '../types/tmdbAPI'

export const getIconByMediaType = (mediaType: MediaType) => {
    switch (mediaType) {
        case 'movie': return <Film />
        case 'tv': return <Tv />
        case 'person': return <PersonLinesFill />
        default: return <QuestionCircle />
    }
}