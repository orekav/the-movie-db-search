import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { PersonLinesFill } from 'react-bootstrap-icons'
import { useParams } from 'react-router-dom';
import { getPersonById, getPersonCombinedCredits } from '../services/tmdbAPI';
import {
    Person,
    PersonParticipations,
} from '../models/tmdbAPI';
import ResultsDisplay from '../components/ResultsDisplay';

type RouteParams = {
    id: string;
}

const PersonDetailsPage = () => {
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
                <Card.Header><PersonLinesFill /> {personDetails?.name}</Card.Header>
                <Card.Body>
                    <Card.Title>{birthday}{placeOfBirth} - {deathday}</Card.Title>
                    <Card.Text>{personDetails?.biography}</Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'>2 days ago</Card.Footer>
            </Card>
            <ResultsDisplay data={personCredits?.cast}/>
        </Container>
    )
}

export default PersonDetailsPage