import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getTVById, getTVCredits } from '../services/tmdbAPI';
import {
    TV,
    TVCredits,
} from '../types/tmdbAPI';
import ResultsDisplay from '../components/ResultsDisplay';
import { getIconByMediaType } from '../helpers/mediaType';

type RouteParams = {
    id: string;
}

const TVDetails = () => {
    const mediaType = 'tv'
    const { id } = useParams<RouteParams>()
    const [tvDetails, setTVDetails] = useState<TV>()
    const [tvCredits, setTVCredits] = useState<TVCredits>()

    useEffect(() => {
        getTVById(id)
            .then(setTVDetails)
        getTVCredits(id)
            .then(setTVCredits)
    }, [id])

    const firstAirDate = tvDetails?.first_air_date ? (new Date(tvDetails.first_air_date)).toLocaleDateString() : 'Unknown'
    const lastAirDate = tvDetails?.last_air_date ? (new Date(tvDetails.last_air_date)).toLocaleDateString() : 'Unknown'


    return (
        <Container>
            <Card className='text-center'>
                <Card.Header>
                    {getIconByMediaType(mediaType)}
                    <Card.Text data-testid='tv-details-name'>
                        {tvDetails?.name || tvDetails?.original_name}
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Title data-testid='tv-details-first-last-dates'> {firstAirDate} - {lastAirDate}</Card.Title>
                    <Card.Text data-testid='tv-details-overview'>{tvDetails?.overview}</Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'>2 days ago</Card.Footer>
            </Card>
            <ResultsDisplay data={tvCredits?.cast} mediaType={mediaType} />
        </Container>
    )
}

export default TVDetails