import React, { useLayoutEffect, useRef } from 'react';
import './App.css';
import SearchBar from './SearchBar'

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    inputRef.current?.focus()
  }, []);

  return (
    <>
      <div className="App-header">
        <SearchBar inputRef={inputRef} />
      </div>
      <div className="App-body">

      </div>
    </>
  );
}

export default App;
