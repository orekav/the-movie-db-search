import { useLayoutEffect, useRef, useState } from 'react'
import SearchBar from '../components/SearchBar'
import ResultsDisplay from '../components/ResultsDisplay'
import { multiSearch } from '../services/tmdbAPI'
import { Container } from 'react-bootstrap'

const Search = () => {
  // Focus at start
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    inputRef.current?.focus()
  }, []);

  const [results, setResults] = useState<any>(null)

  const searchHandler = (query: string) => {
    multiSearch({ query })
      .then(data => setResults(data))
      .catch(console.error)
  }

  return (
    <Container>
      <SearchBar
        inputRef={inputRef}
        handleSearch={searchHandler}
      />
      <ResultsDisplay
        data={results}
      />
    </Container>
  );
}

export default Search;
