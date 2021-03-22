import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getImageSourceURL, getTVById, getTVCredits } from '../services/tmdbAPI';
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
                {tvDetails?.poster_path &&
                    <Card.Img
                        src={getImageSourceURL(tvDetails.poster_path, 'w200')}
                        style={{
                            width: '25%',
                            height: '25%',
                            alignSelf: 'center',
                            padding: '5px'
                        }}
                    />
                }
                <Card.Body>
                    <Card.Title data-testid='tv-details-first-last-dates'> {firstAirDate} - {lastAirDate}</Card.Title>
                    <Card.Text data-testid='tv-details-overview'>{tvDetails?.overview}</Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'></Card.Footer>
            </Card>
            <ResultsDisplay data={tvCredits?.cast} mediaType={'person'} />
        </Container>
    )
}

export default TVDetails