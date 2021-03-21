import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getTVById, getTVCredits } from '../services/tmdbAPI';
import {
    TV,
    TVCredits,
} from '../models/tmdbAPI';
import ResultsDisplay from '../components/ResultsDisplay';
import { Tv } from 'react-bootstrap-icons';

type RouteParams = {
    id: string;
}

const TVDetails = () => {
    const { id } = useParams<RouteParams>()
    const [tvDetails, setTVDetails] = useState<TV>()
    const [tvCredits, setTVCredits] = useState<TVCredits>()

    useEffect(() => {
        getTVById(id)
            .then(setTVDetails)
        getTVCredits(id)
            .then((results) => {
                const cast = results.cast?.map(castMember => ({ ...castMember, media_type: 'person' } as typeof castMember))
                const crew = results.crew?.map(crewMember => ({ ...crewMember, media_type: 'person' } as typeof crewMember))
                setTVCredits({
                    id: results.id,
                    cast,
                    crew,
                })
            })
    }, [id])

    const firstAirDate = tvDetails?.first_air_date ? (new Date(tvDetails.first_air_date)).toLocaleDateString() : 'Unknown'
    const lastAirDate = tvDetails?.last_air_date ? (new Date(tvDetails.last_air_date)).toLocaleDateString() : 'Unknown'


    return (
        <Container>
            <Card className='text-center'>
                <Card.Header><Tv /> {tvDetails?.name || tvDetails?.original_name}</Card.Header>
                <Card.Body>
                    <Card.Title> {firstAirDate} - {lastAirDate}</Card.Title>
                    <Card.Text>{tvDetails?.overview}</Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'>2 days ago</Card.Footer>
            </Card>
            <ResultsDisplay data={tvCredits?.cast} />
        </Container>
    )
}

export default TVDetails