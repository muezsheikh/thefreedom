import React from 'react'

export default function SearchInput({ inputChangeHandler }) {
  return (
    <div className='searchInput'>
      <input type="text" placeholder='Search...' onChange={(e) => inputChangeHandler(e.target.value)} />
      <i className="fas fa-search"></i>
    </div>
  )
}
