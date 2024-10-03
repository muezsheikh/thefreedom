import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AddCategory from '../components/AddCategory'
import axios from 'axios'

export default function Categories({
  postContentHandler,
  postContent,
}) {
  const [categories, setCategories] = useState([])
  const [activeCat, setActiveCat] = useState(false)

  const activeCatFunc = () => {
    setActiveCat(!activeCat)
  }

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/categories/get`
      )
      setCategories(response.data)
    } catch (error) {
      toast.error(
        `Error: ${error.message || 'An error occurred while fetching data.'}`
      )
    } finally {
      toast.dismiss()
    }
  }
  useEffect(() => {
    getCategories()
  }, [toast])
  return (
    <>
      <div className='categories'>
        <label>Choose Category:</label>
        <select
          onChange={(e) => postContentHandler('sCategory', e.target.value)}
          defaultValue={null}
        >
          <option value={null} disabled selected>
            Choose Category
          </option>
          {categories &&
            categories?.categories?.map((cat) => (
              <option key={cat._id} value={cat.link}>
                {cat.category}
              </option>
            ))}
        </select>
      </div>
      <div className='submitButton' onClick={activeCatFunc}>
        <button>Add New Category</button>
      </div>
      <AddCategory
        getCategories={getCategories}
        activeCat={activeCat}
        postContent={postContent}
        postContentHandler={postContentHandler}
      />
    </>
  )
}
