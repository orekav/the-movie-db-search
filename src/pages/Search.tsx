import { useLayoutEffect, useRef, useState } from 'react'
import SearchBar from '../components/SearchBar'
import ResultsDisplay from '../components/ResultsDisplay'
import { multiSearch } from '../services/tmdbAPI'
import { Container } from 'react-bootstrap'
import { MultiSearchCommonProperties } from '../models/tmdbAPI'

const Search = () => {
  // Focus at start
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    inputRef.current?.focus()
  }, []);

  const [results, setResults] = useState<MultiSearchCommonProperties[]>()

  const searchHandler = (query: string) => {
    multiSearch({ query })
      .then(data => {
        setResults(data.results)
      })
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
