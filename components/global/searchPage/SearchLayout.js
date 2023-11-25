import React from 'react'
import SearchInput from './SearchInput'
import SearchResult from './SearchResult'

export default function SearchLayout({ activeSearch, activeSearchFunc }) {
  return (
    <div className={`searchContainer ${activeSearch ? 'activeSearch' : ''}`}>
      <div className='searchCrossIcon'>
        <i className='fas fa-xmark' onClick={activeSearchFunc}></i>
      </div>
      <SearchInput />
      <SearchResult />
    </div>
  )
}
