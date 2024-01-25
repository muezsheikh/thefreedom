import React from 'react'
import dynamic from 'next/dynamic'

import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function ReactQuillSection({postContent,postContentHandler}) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'list',
    'bullet',
  ]
  return (
    <>
      <ReactQuill
        theme='snow'
        value={postContent.content}
        onChange={(value) => postContentHandler('content', value)}
        modules={modules}
        formats={formats}
        placeholder='Enter Content...'
      />
    </>
  )
}
