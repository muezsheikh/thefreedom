import React, { useState, useEffect } from 'react'
import styles from '@/styles/client/SearchBar.module.css'
import Link from 'next/link'
import useGetProd from '@/store/useGetProd'
import useGetData from '@/store/useGetData'

export default function SearchBar({ activeSearchFunc }) {
  const { data, loading, fetchData } = useGetData()
  const { getCustomFunc } = useGetProd()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    fetchData('posts/get')
  }, [fetchData])

  useEffect(() => {
    // Filter data based on the search term
    if (searchTerm) {
      const filtered = data?.posts?.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(filtered)
    } else {
      setFilteredData([])
    }
  }, [searchTerm, data])

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
const Click = ()=>{

}
  return (
    <div className={styles.searchBar}>
      <div onClick={activeSearchFunc} className={styles.searchCrossIcon}>
        <i className='fas fa-xmark'></i>
      </div>
      <div className={styles.searchInput}>
        <input
          type='text'
          placeholder='Search a post by title,category'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Show Loader while loading */}
      {loading && <div className='loader'></div>}

      {/* Only show data if there's a search term */}
      {searchTerm && (
        <div className={styles.posts}>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div className={styles.post} key={item._id}>
                <div className={styles.postImg}>
                  <img src={item.image} alt={item.title} />
                </div>
                <div className={styles.postBody}>
                  <Link
                    onClick={() => {getCustomFunc(item), activeSearchFunc()}}
                    href={`/${item?.category}/${
                      !item.postCustomId ? item._id : item.postCustomId
                    }`}
                  >
                    <p className={styles.postTitle}>{item.title}</p>
                  </Link>
                  <p className={styles.postDate}>{item.date}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No results found for "{searchTerm}"</p>
          )}
        </div>
      )}

      {/* Pagination */}
      {searchTerm && filteredData.length > itemsPerPage && (
        <div className={styles.pagination}>
          {[...Array(Math.ceil(filteredData.length / itemsPerPage)).keys()].map(
            (number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={currentPage === number + 1 ? styles.active : ''}
              >
                {number + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
