import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getPersonById, getPersonCombinedCredits } from '../services/tmdbAPI';
import {
    Person,
    PersonParticipations,
} from '../types/tmdbAPI';
import ResultsDisplay from '../components/ResultsDisplay';
import { getIconByMediaType } from '../helpers/mediaType';

type RouteParams = {
    id: string;
}

const PersonDetailsPage = () => {
    const mediaType = 'person'
    const { id } = useParams<RouteParams>()
    const [personDetails, setPersonDetails] = useState<Person>()
    const [personCredits, setPersonCredits] = useState<PersonParticipations>()

    useEffect(() => {
        getPersonById(id)
            .then(setPersonDetails)
        getPersonCombinedCredits(id)
            .then(setPersonCredits)
    }, [id])

    const placeOfBirth = personDetails?.place_of_birth ? `(${personDetails.place_of_birth})` : ''
    const birthday = personDetails?.birthday ? (new Date(personDetails.birthday)).toLocaleDateString() : 'Unknown Birthday'
    const deathday = personDetails?.deathday !== undefined ?
        (personDetails?.deathday !== null ? (new Date(personDetails.deathday)).toLocaleDateString() : 'Present')
        : 'Unknown'

    return (
        <Container>
            <Card className='text-center'>
                <Card.Header>
                    {getIconByMediaType(mediaType)}
                    <Card.Text data-testid='person-details-name'>
                        {personDetails?.name}
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{birthday}{placeOfBirth} - {deathday}</Card.Title>
                    <Card.Text data-testid='person-details-biography'>{personDetails?.biography}</Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'>2 days ago</Card.Footer>
            </Card>
            <ResultsDisplay data={personCredits?.cast} mediaType={mediaType} />
        </Container>
    )
}

export default PersonDetailsPage