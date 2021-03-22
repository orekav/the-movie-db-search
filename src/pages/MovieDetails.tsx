import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getMovieById, getMovieCredits } from '../services/tmdbAPI';
import {
    Movie,
    MovieCredits,
} from '../types/tmdbAPI';
import ResultsDisplay from '../components/ResultsDisplay';
import { getIconByMediaType } from '../helpers/mediaType';

type RouteParams = {
    id: string;
}

const MovieDetails = () => {
    const mediaType = 'movie'
    const { id } = useParams<RouteParams>()
    const [movieDetails, setMovieDetails] = useState<Movie>()
    const [movieCredits, setMovieCredits] = useState<MovieCredits>()

    useEffect(() => {
        getMovieById(id)
            .then(setMovieDetails)
        getMovieCredits(id)
            .then(setMovieCredits)
    }, [id])

    const releaseDate = movieDetails?.release_date ? (new Date(movieDetails.release_date)).toLocaleDateString() : 'Unknown Birthday'

    return (
        <Container>
            <Card className='text-center'>
                <Card.Header>
                    {getIconByMediaType(mediaType)}
                    <Card.Text data-testid='movie-details-title'>
                        {movieDetails?.title || movieDetails?.original_title}
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{releaseDate}</Card.Title>
                    <Card.Text data-testid='movie-details-overview'>{movieDetails?.overview}</Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'>2 days ago</Card.Footer>
            </Card>
            <ResultsDisplay data={movieCredits?.cast} mediaType={'person'} />
        </Container>
    )
}

export default MovieDetails