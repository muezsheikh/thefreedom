import React from 'react'

export default function ImageUp({ postContent, postContentHandler }) {
  return (
    <>
      <label>Upload Image:</label>
      <input
        type='file'
        onChange={(e) => postContentHandler('uploadImg', e.target.files[0])}
      />
      {postContent.uploadedImageUrl && ( // Display the uploaded image if URL exists
        <div>
          <p>Selected Image:</p>
          <img
            src={postContent.uploadedImageUrl}
            alt='Uploaded'
            style={{ width: '200px' }}
          />
        </div>
      )}
    </>
  )
}
