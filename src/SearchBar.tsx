import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

type SearchBarProps = { inputRef?: React.RefObject<HTMLInputElement> }
const SearchBar = ({ inputRef }: SearchBarProps) => {
  return (
    <div>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <Icon.Search />
          </InputGroup.Text>
          <FormControl
            data-testid="search-bar-input"
            ref={inputRef}
          />
          <InputGroup.Append>
            <Button
              data-testid="search-bar-button"
              variant="outline-primary"
            >Search</Button>
          </InputGroup.Append>
        </InputGroup>
    </div>
  );
}

export default SearchBar;
