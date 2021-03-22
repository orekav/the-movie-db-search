import { useLayoutEffect, useRef, useState } from 'react'
import SearchBar from '../components/SearchBar'
import ResultsDisplay from '../components/ResultsDisplay'
import { movieSearch, multiSearch, personSearch, tvSearch } from '../services/tmdbAPI'
import { Container } from 'react-bootstrap'
import { MediaType, MultiSearchCommonProperties } from '../types/tmdbAPI'

const Search = () => {
  // Focus at start
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    inputRef.current?.focus()
  }, []);

  const [results, setResults] = useState<MultiSearchCommonProperties[]>()
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType>()

  const searchHandler = (mediaType: MediaType, query: string) => {
    let searchPromise
    switch (mediaType) {
      case 'movie':
        searchPromise = movieSearch({ query })
        break;
      case 'tv':
        searchPromise = tvSearch({ query })
        break
      case 'person':
        searchPromise = personSearch({ query })
        break
      case 'multi':
      default:
        searchPromise = multiSearch({ query })
    }
    searchPromise
      .then(data => {
        setSelectedMediaType(mediaType)
        setResults(data.results.map(media => ({ ...media, media_type: media.media_type || mediaType })))
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
        mediaType={selectedMediaType}
      />
    </Container>
  );
}

export default Search;
