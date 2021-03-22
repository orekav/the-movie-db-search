import { KeyboardEventHandler, MouseEventHandler, useCallback, useState } from 'react';
import { DropdownButton, Dropdown, InputGroup } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { AsyncTypeahead, InputProps, TypeaheadMenuProps, TypeaheadResult } from 'react-bootstrap-typeahead';
import Button from 'react-bootstrap/Button';
import { MediaType, SearchMovie } from '../types/tmdbAPI';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { movieSearch, multiSearch, personSearch, tvSearch } from '../services/tmdbAPI';
import { getIconByMediaType } from '../helpers/mediaType';
import { useHistory } from 'react-router';

const mediaTypes = {
  multi: 'All',
  movie: 'Movies',
  tv: 'Shows',
  person: 'People',
}

type SearchBarProps = {
  autoFocus?: boolean;
  handleSearch: (mediaType: MediaType, query: string) => any;
}

const SearchBar = ({ autoFocus = false, handleSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType>('multi')

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter')
      handleSearch(selectedMediaType, query)
  }

  const clickHandler: MouseEventHandler<HTMLElement> = () => {
    handleSearch(selectedMediaType, query)
  }

  type Option = {
    id: number;
    name: string;
    media_type: MediaType;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const { push } = useHistory()

  const searchHandler = useCallback((query: string) => {
    let searchPromise
    switch (selectedMediaType) {
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
    setIsLoading(true)
    searchPromise
      .then(data => {
        setSelectedMediaType(selectedMediaType)
        setOptions(data.results.map(
          media => ({
            name: media.name! || (media as SearchMovie).title!,
            media_type: media.media_type || selectedMediaType,
            id: media.id!,
          })
        ))
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [selectedMediaType])


  const filterBy = () => true;

  const onChangeHandler = ([selectedOption]: Option[]) => {
    if (selectedOption) {
      push(`/${selectedOption.media_type}/${selectedOption.id}`)
      setQuery(selectedOption.name)
    }
  }

  const childrenRenderer = (option: TypeaheadResult<Option>, props: TypeaheadMenuProps<Option>) => (
    <Dropdown.Item>
      {getIconByMediaType(option.media_type)}
      <span>{option.name}</span>
    </Dropdown.Item>
  )

  return (
    <div>
      <InputGroup className='mb-3'>
        <InputGroup.Text>
          <Icon.Search />
        </InputGroup.Text>
        <AsyncTypeahead<Option>
          id='search-bar-input'
          filterBy={filterBy}
          isLoading={isLoading}
          labelKey='name'
          minLength={3}
          onSearch={searchHandler}
          options={options}
          placeholder='Search for a Movie, TV Show or Person...'
          renderMenuItemChildren={childrenRenderer}
          onChange={onChangeHandler}
          onInputChange={setQuery}
          multiple={false}
          autoFocus={autoFocus}
          onKeyDown={onKeyPress as unknown as (e: Event) => void}
          inputProps={{
            'data-testid': 'search-bar-input',
          } as InputProps}
        />
        <DropdownButton
          as={InputGroup.Append}
          variant='outline-secondary'
          title={mediaTypes[selectedMediaType]}
        >
          {
            Object.entries(mediaTypes)
              .map(([key, value]) => (
                <Dropdown.Item
                  key={key}
                  onClick={() => setSelectedMediaType(key as MediaType)}
                >
                  {mediaTypes[key as MediaType]}
                </Dropdown.Item>
              ))
          }
        </DropdownButton>
        <InputGroup.Append>
          <Button
            data-testid='search-bar-button'
            variant='outline-primary'
            onClick={clickHandler}
          >Search</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

export default SearchBar;
