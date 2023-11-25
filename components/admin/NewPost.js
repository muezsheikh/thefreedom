import React from 'react';

export default function NewPost() {
  return (
    <div className='newPost'>
      <div className='container'>
        <div className='newPostContainer'>
          <div className='title'>
            <h1>Add New Post</h1>
          </div>
          <div className='newPostContent'>
            <div className='inputGroup'>
              <label>Title:</label>
              <input type='text' placeholder='Enter Title...' />
            </div>
            <div className='inputGroup'>
              <label>Content:</label>
              <textarea placeholder='Enter Content...'></textarea>
            </div>
            <div className='inputGroup'>
              <label>Upload Image:</label>
              <input type='file' />
              <p className='uploadText'>Upload Image</p>
            </div>
            <div className='inputGroup inputGroupB'>
              <label>Banner</label>
              <input type='checkbox' />
            </div>
            <div className='inputGroup'>
              <div className='categories'>
                <label>Select Category:</label>
                <select name='' id=''>
                  <option value=''>Business</option>
                  <option value=''>Technology</option>
                  <option value=''>Travel</option>
                  <option value=''>Fashion</option>
                  <option value=''>Food</option>
                  <option value=''>Other</option>
                </select>
              </div>
              <div className='newCategory'>
                <label>Add New Category:</label>
                <div className='input'>
                  <input type='text' placeholder='Write New Category Name' />
                </div>
              </div>
            </div>
            <div className='submitButton'>
              <button>Add Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
