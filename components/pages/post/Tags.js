import React from 'react'

export default function Tags({ post }) {
  return (
    <div className='tags'>
      <div className="title">
        <h3>Tags:</h3>
      </div>
      <div className="tagsC">
        {post?.tags?.map((x, ind) => (
          <p key={ind}>{x}</p>
        ))}
      </div>
    </div>
  )
}
