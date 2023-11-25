import React from 'react'

export default function Messages() {
  return (
    <div className='messages'>
      <div className='container'>
        <div className='messagesContainer'>
          <div className='title'>
            <h1>Messages</h1>
          </div>

          <div className='messagesContent'>
            <div className='message'>
              <div className='messageContent'>
                <h3>John Cena</h3>
                <p>johncena@gmail.com</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Numquam vitae quia necessitatibus incidunt, ex reprehenderit!
                </p>
              </div>
              <div className="deleteButton">
                <button>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
