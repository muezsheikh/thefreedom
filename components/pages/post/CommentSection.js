import React, { useEffect, useState } from 'react'
import AddReply from './AddReply'
import ReplyArea from './ReplyArea'
import AddComment from './AddComment'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function CommentSection({ postId }) {
  const [activeRep, setActiveRep] = useState(false)
  const [getReply, setGetReply] = useState('')
  const activeRepFunc = (commentId) => {
    setGetReply(commentId)
    setActiveRep(!activeRep)
  }

const [comments, setComments] = useState([]);
const getComments = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/get`);
    setComments(response.data.comments);
  } catch (error) {
    toast.error(`Error: ${error.message || 'An error occurred while fetching data.'}`);
  } finally {
    toast.dismiss();
  }
};

// 
const [replies, setReplies] = useState([]);
const getReplies = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/replies/get`);
    setReplies(response.data.replies);
  } catch (error) {
    toast.error(`Error: ${error.message || 'An error occurred while fetching data.'}`);
  } finally {
    toast.dismiss();
  }
};
// 


  
  const postComments = comments.filter((comment) => comment.postId === postId)


  const [commentsData, setCommentsData] = useState({
    postId: postId,
    name: '',
    email: '',
    comment: '',
  })
  const inputChangeHandler = (e) => {
    setCommentsData({
      ...commentsData, [e.target.name]: e.target.value
    })
  }



  const postComment = async () => {
    if (commentsData.name === '') {
      return toast.info('Please Enter Your Name!', { autoClose: 1500 })
    }
    if (commentsData.email === '') {
      return toast.info('Your Email is required!', { autoClose: 1500 })
    }
    if (commentsData.comment === '') {
      return toast.info('Comment?', { autoClose: 1500 })
    }
    try {
      const loadingToast = toast.info('Posting...', { autoClose: false });

      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });


      const commentDetails = {
        postId: commentsData.postId,
        name: commentsData.name,
        email: commentsData.email,
        comment: commentsData.comment,
        date: currentDate,
      };

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/create`, commentDetails);

      if (data.success) {
        toast.dismiss(loadingToast);
        toast.success(data.msg, { autoClose: 1500 });
        getComments()
        getReplies()
        setCommentsData({
          postId: '',
          name: '',
          email: '',
          comment: '',
        })
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error('Error posting the comment:', error);
      toast.error(`Error posting the comment. Please try again. ${error.message}`);
    }
  }


  const [repliesData, setRepliesData] = useState({
    name: '',
    email: '',
    reply: '',
  })
  const inputChangeHandlerReplies = (e) => {
    setRepliesData({
      ...repliesData, [e.target.name]: e.target.value
    })
  }



  const postReply = async (commentId, commenterName) => {
    if (repliesData.name === '') {
      return toast.info('Please Enter Your Name!', { autoClose: 1500 })
    }
    if (repliesData.email === '') {
      return toast.info('Your Email is required!', { autoClose: 1500 })
    }
    if (repliesData.comment === '') {
      return toast.info('Comment?', { autoClose: 1500 })
    }
    try {
      const loadingToast = toast.info('Posting...', { autoClose: false });

      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });


      const replyDetails = {
        commentId: commentId,
        commenterName: commenterName,
        name: repliesData.name,
        email: repliesData.email,
        reply: repliesData.reply,
        date: currentDate,
      };

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/replies/create`, replyDetails);

      if (data.success) {
        toast.dismiss(loadingToast);
        toast.success(data.msg, { autoClose: 1500 });
        getReplies()
        setRepliesData({
          name: '',
          email: '',
          reply: '',
        })
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error('Error posting the reply:', error);
      toast.error(`Error posting the reply. Please try again. ${error.message}`);
    }
  }
  useEffect(() => {
    getComments();
    getReplies();
  }, []); 
  return (
    <>
      {postComments &&
        <div className="commentsSection">
          <div className="commentSectionTitle">
            <h3>Comments {postComments.length}</h3>
          </div>
          <div className="commentsContent">
            {postComments.map((comment) => {
              const singlePostReply = replies.filter((reply) => reply.commentId === comment._id)
              return (
                <div className="comment" key={comment._id}>
                  <div className="mainComment">
                    <h3>{comment.name}</h3>
                    <p>{comment.comment}</p>
                    <div className="date">
                      <p>{comment.date}</p>
                      <button onClick={() => activeRepFunc(comment._id)}>Reply</button>
                    </div>
                    {activeRep && getReply === comment._id &&
                      <AddReply commenterName={comment.name} commentId={comment._id} inputChangeHandlerReplies={inputChangeHandlerReplies} repliesData={repliesData} postReply={postReply} />
                    }
                  </div>
                  {
                    singlePostReply  && 

                    <ReplyArea  singlePostReply={singlePostReply}/>

                  }
                </div>
              )
            })}
          </div>
        </div>
      }

      <AddComment commentsData={commentsData} inputChangeHandler={inputChangeHandler} postComment={postComment} />
    </>

  )
}
