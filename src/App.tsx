import React, { useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import ResultsDisplay from './components/ResultsDisplay'

const App = () => {
  // Focus at start
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    inputRef.current?.focus()
  }, []);

  const searchHandler = (query: string) => null

  return (
    <>
      <div className='App-header'>
        <SearchBar
          inputRef={inputRef}
          handleSearch={searchHandler}
        />
      </div>
      <div className='App-body'>

      </div>
    </>
  );
}

export default App;
