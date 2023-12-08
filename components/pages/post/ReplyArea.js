import React from 'react'

export default function ReplyArea({ singlePostReply }) {
  return (
    <>
      {singlePostReply.map((reply, ind) => (
      <div className="replyArea">
        <div className="replyAreaTitle">
          <h3>Reply To {reply.commenterName}</h3>
        </div>
          <div className="replyContent" key={ind}>
            <h3>{reply.name}</h3>
            <p>{reply.reply}</p>
            <div className="date">
              <p>{reply.date}</p>
            </div>
          </div>

      </div>
        ))}
    </>

  )
}
