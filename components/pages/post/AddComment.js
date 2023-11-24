import React from 'react'

export default function AddComment() {
  return (
    <div class="AwesomeCommentSection">
      <div class="commentTitle">
        <h3>Join the Conversation</h3>
        <p>Your thoughts matter! Share them with us below.</p>
        <p class="note">Note: Your email address will not be published. Required fields are marked*</p>
      </div>
      <div class="commentContent">
        <div class="inputGroup">
          <input type="text" placeholder="Your Name*" />
        </div>
        <div class="inputGroup">
          <input type="email" placeholder="Your Email*" />
        </div>
        <div class="inputGroup">
          <textarea placeholder="Your Amazing Comment*"></textarea>
        </div>
      </div>
      <div class="submitBtn">
        <button>Post Your Thoughts</button>
      </div>
    </div>
  )
}
