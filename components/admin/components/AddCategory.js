import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

export default function AddCategory({ activeCat, postContentHandler, postContent, getCategories }) {
  const addCategory = async () => {
    try {
      const loadingToast = toast.info('Adding...', { autoClose: false });
      const categoryDetail = {
        category: postContent.nCategory,
        link: postContent.categoryLink,
      };
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/categories/create`, categoryDetail);
      if (data.success) {
        toast.dismiss(loadingToast);
        toast.success(data.msg, { autoClose: 1500 });
        getCategories();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error('Error adding the category:', error);
      toast.error(`Error adding the category. Please try again. ${error.message}`);
    }
  };

  return (
    <div className={`newCategory ${activeCat ? 'activeCat' : ''}`} style={{ marginTop: '1rem' }}>
      <label>Add New Category:</label>
      <div className='input'>
        <input
          type='text'
          onChange={(e) => postContentHandler('nCategory', e.target.value)}
          value={postContent.nCategory}
          placeholder='Write New Category Name'
        />
        <input
          type='text'
          onChange={(e) => postContentHandler('categoryLink', e.target.value)}
          value={postContent.categoryLink}
          placeholder='Category Link'
        />
      </div>
      <div className='submitButton'><button onClick={addCategory} style={{ backgroundColor: '#00D100' }}>Add Category</button> </div>
    </div>
  )
}
