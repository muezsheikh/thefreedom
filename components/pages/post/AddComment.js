import React, { useState } from 'react'

export default function AddComment({commentsData, postComment, inputChangeHandler}) {
 
  return (
    <div class="AwesomeCommentSection">
      <div class="commentTitle">
        <h3>Join the Conversation</h3>
        <p>Your thoughts matter! Share them with us below.</p>
        <p class="note">Note: Your email address will not be published. Required fields are marked*</p>
      </div>
      <div class="commentContent">
        <div class="inputGroup">
          <input name='name' value={commentsData.name}  onChange={inputChangeHandler} type="text" placeholder="Your Name*" />
        </div>
        <div class="inputGroup">
          <input name='email'  value={commentsData.email} onChange={inputChangeHandler} type="email" placeholder="Your Email*" />
        </div>
        <div class="inputGroup">
          <textarea name='comment'  value={commentsData.comment} onChange={inputChangeHandler} placeholder="Your Comment*"></textarea>
        </div>
      </div>
      <div class="submitBtn">
        <button onClick={postComment}>Post Your Thoughts</button>
      </div>
    </div>
  )
}
