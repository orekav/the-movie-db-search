import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, RefObject, useState } from 'react';
import { DropdownButton, Dropdown, FormControl, InputGroup } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { MediaType } from '../types/tmdbAPI';

const mediaTypes = {
  multi: 'All',
  movie: 'Movies',
  tv: 'Shows',
  person: 'People',
}

type SearchBarProps = {
  inputRef?: RefObject<HTMLInputElement>;
  handleSearch: (mediaType: MediaType, query: string) => any;
}

const SearchBar = ({ inputRef, handleSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType>('multi')

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter')
      handleSearch(selectedMediaType, query)
  }

  const inputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.currentTarget.value)
  }

  const clickHandler: MouseEventHandler<HTMLElement> = () => {
    handleSearch(selectedMediaType, query)
  }

  return (
    <div>
      <InputGroup className='mb-3'>
        <InputGroup.Text>
          <Icon.Search />
        </InputGroup.Text>
        <FormControl
          data-testid='search-bar-input'
          ref={inputRef}
          onKeyPress={onKeyPress}
          onChange={inputHandler}
        />
        <DropdownButton
          as={InputGroup.Append}
          variant="outline-secondary"
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
