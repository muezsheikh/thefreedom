import React from 'react';
import { comments } from './data';

export default function Comments() {
  const handleEdit = (type, id) => {
    // Replace with your edit logic
  };

  const handleDelete = (type, id) => {
    // Replace with your delete logic
  };

  return (
    <div className='commentsPage'>
      <div className='container'>
        <div className='title'>
          <h1>Comments</h1>
        </div>
        <div className='commentsContainer'>
          {comments.map((comment, index) => (
            <div className='commentS' key={index}>
              <div className='commentDetails'>
                <h3>{comment.name}</h3>
                <p>{comment.email}</p>
                <p>{comment.comment}</p>
              </div>
              <div className='commentButtons'>
                <button onClick={() => handleEdit('comment', index)}>Edit</button>
                <button onClick={() => handleDelete('comment', index)} style={{backgroundColor: 'red'}}>Delete</button>
              </div>
              {comment.replies && comment.replies.length > 0 && (
                <div className='repliesContainer'>
                  {comment.replies.map((reply, replyIndex) => (
                    <div className='replyS' key={replyIndex}>
                      <div className='replyDetails'>
                        <h4>{reply.name}</h4>
                        <p>{reply.email}</p>
                        <p>{reply.reply}</p>
                      </div>
                      <div className='replyButtons'>
                        <button onClick={() => handleEdit('reply', replyIndex)}>Edit</button>
                        <button style={{backgroundColor: 'red'}} onClick={() => handleDelete('reply', replyIndex)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
