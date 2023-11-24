import React, { useState } from 'react'

export default function CommentSection() {
  const [activeRep, setActiveRep] = useState(false)
  const activeRepFunc = () => {
    setActiveRep(!activeRep)
  }
  return (
    <div className="commentsSection">
      <div className="title">
        <h3>Comments 3</h3>
      </div>
      <div className="comments">
        <div className="comment">
          <div className="commentContent">
            <h3>John Cena</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, corporis?</p>
            <div className="date">
              <p className="date">November 23, 2019</p>
              <button onClick={activeRepFunc}>Reply</button>
            </div>
          </div>
          <div className={`replyC ${activeRep ? 'activeRS' : ''}`}>
            <div className="title">
              <h3>Reply to John</h3>
            </div>
            <div className="inputS">
              <div><input type="text" placeholder='Your Name*' /></div>
              <div><input type="text" placeholder='Your Email*' /></div>
              <div><textarea type="text" placeholder='Your Reply*' ></textarea></div>
            </div>
            <div className="submitBtn">
              <button>Add Reply</button>
            </div>
          </div>
        </div>
        <div className="comment">
          <div className="commentContent">
            <h3>John Cena</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, corporis?</p>
            <div className="date">
              <p className="date">November 23, 2019</p>
              <button>Reply</button>
            </div>
          </div>
        </div>
        <div className="comment">
          <div className="commentContent">
            <h3>John Cena</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, corporis?</p>
            <div className="date">
              <p className="date">November 23, 2019</p>
              <button>Reply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
