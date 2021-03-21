import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, RefObject, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

type SearchBarProps = {
  inputRef?: RefObject<HTMLInputElement>
  handleSearch: (query: string) => any
}

const SearchBar = ({ inputRef, handleSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter')
      handleSearch(query)
  }

  const inputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.currentTarget.value)
  }

  const clickHandler: MouseEventHandler<HTMLElement> = () => {
    handleSearch(query)
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
