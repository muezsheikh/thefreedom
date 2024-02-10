import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const getMessages = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/message/get`);
      setMessages(response.data.data);

    } catch (error) {
      toast.error(`Error: ${error.message || 'An error occurred while fetching data.'}`);
    } finally {
      toast.dismiss();
      setLoading(false)
    }
  };
  useEffect(() => {


    getMessages();
  }, []);
  const deleteMessage = async (id) => {
    try {
      const loadingToast = toast.info('deleting...', { autoClose: false });
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/message/delete/${id}`);
      if (data.success) {
        toast.dismiss(loadingToast);
        toast.success('Message Deleted!')
        getMessages()

      } else {
        toast.error("Oops! please try again!");
      }
    } catch (error) {
      console.error('Error deleting the message:', error);
      toast.error(`Error deleting the message. Please try again. ${error.message}`);
    }
  };
  return (
    <div className='messages'>
      <div className='container'>
        <div className='messagesContainer'>
          <div className='title'>
            <h1>Messages</h1>
          </div>

          <div className='messagesContent'>
            {loading ? (
              <div className="heroSkeletonContainer">
                <div className="skeleton-element"></div>

              </div>
            ) : (
              messages && (
                <>
                  {messages.map((message, ind) => (
                    <div className='message'>
                      <div className='messageContent'>
                        <h3>{message.name}</h3>
                        <p>{message.email}</p>
                        <p>
                          {message.message}
                        </p>
                        <p>
                          {message.date}
                        </p>
                      </div>
                      <div className="deleteButton">
                        <button onClick={()=> deleteMessage(message._id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </>
              )

            )}

          </div>
        </div>
      </div>
    </div>
  )
}
