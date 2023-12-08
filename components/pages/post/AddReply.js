import React from 'react'

export default function AddReply({ commenterName, inputChangeHandlerReplies, repliesData, postReply, commentId }) {
  return (
    <div class="AwesomeCommentSection">
      <div class="commentTitle">
        <h3>Reply To {commenterName}</h3>
        <p class="note">Note: Your email address will not be published. Required fields are marked*</p>
      </div>
      <div class="commentContent">
        <div class="inputGroup">
          <input name='name' value={repliesData.name} onChange={inputChangeHandlerReplies} type="text" placeholder="Your Name*" />
        </div>
        <div class="inputGroup">
          <input name='email' value={repliesData.email} onChange={inputChangeHandlerReplies} type="email" placeholder="Your Email*" />
        </div>
        <div class="inputGroup">
          <textarea name='reply' value={repliesData.reply} onChange={inputChangeHandlerReplies} placeholder="Your Reply*"></textarea>
        </div>
      </div>
      <div class="submitBtn">
        <button onClick={() => postReply(commentId, commenterName)} >Add Reply</button>
      </div>
    </div>
  )
}
