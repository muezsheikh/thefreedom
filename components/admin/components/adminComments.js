import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function AdminComments({ postId, viewComments }) {
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [commentsResponse, repliesResponse] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/get`),
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/replies/get`),
      ]);

      setComments(commentsResponse.data.comments);
      setReplies(repliesResponse.data.replies);
    } catch (error) {
      toast.error(`Error: ${error.message || 'An error occurred while fetching data.'}`);
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  useEffect(() => {
    fetchData();
  }, [postId]); // Add postId as a dependency if you want to refetch when postId changes.

  const postComments = comments.filter((comment) => comment.postId === postId);


  const commentsRepliesLength = postComments.length + replies.length

  const deleteComment = async (id) => {
    try {
      toast.info('Deleting....', { autoClose: false });

      const [deleteCommentResponse, deleteRepliesResponse] = await Promise.all([
        axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/delete/${id}`),
        axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/replies/delcomment/${id}`),
      ]);

      // Process the responses if needed

      toast.success('Comment deleted successfully!');
    } catch (error) {
      toast.error(`Error: ${error.message || 'An error occurred while deleting data.'}`);
    } finally {
      // Refetch comments and replies after deletion
      fetchData()
      toast.dismiss();
      // Optionally, you can trigger a refetch or update the UI after deletion.
      // Example: refetchData();
    }
  };

  const deleteReply = async (id) => {
    try {
      const loadingToast = toast.info('deleting...', { autoClose: false });
      // Assuming postId is defined somewhere in your component state
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/replies/delete/${id}`);
      if (data.success) {
        toast.dismiss(loadingToast);
        toast.success('Deleted! SuccessFully')
        fetchData()
      } else {
        toast.error("Oops! please try again!");
      }
    } catch (error) {
      console.error('Error deleting the reply:', error);
      toast.error(`Error deleting the reply. Please try again. ${error.message}`);
    }
  };

  return (
    <div className='adminCommentsOverlay'>
      <div className="adminCommentsContainer">
        <div className="adminCrossIcon">
          <i onClick={viewComments} className="fas fa-xmark"></i>
        </div>
        <div className="container">
          <div className="commentsSection">
            <div className="commentSectionTitle">
              {postComments.length === 0 ? <h1>No Comments</h1>
                :
                <h3>Comments {commentsRepliesLength}</h3>
              }
            </div>
            {loading ? <>
              <div className="heroSkeletonContainer">
                <div className="skeleton-element"></div>

              </div>
            </> : <>

              <div className="commentsContent">
                {postComments.map((comment) => {
                  const singlePostReply = replies.filter((reply) => reply.commentId === comment._id)
                  return (
                    <div className="comment" >
                      <div className="commentCrossIcon">
                        <i onClick={()=> deleteComment(comment._id)} className="fas fa-xmark"></i>
                      </div>
                      <div className="mainComment">
                        <h3>{comment.name}</h3>
                        <p>{comment.email}</p>
                        <p>{comment.comment}</p>
                        <div className="date">
                          <p>{comment.date}</p>
                        </div>
                      </div>
                      {singlePostReply &&
                        (
                          singlePostReply.map((x, ind) => (
                            <div className="replyArea" key={ind}>
                              <div className="replyAreaTitle replyAreaTitleAdmin">
                                <h3>Reply To {x.commenterName}</h3>
                                <div className="replyCrossIcon">
                                  <i onClick={()=> deleteReply(x._id)} className="fas fa-xmark"></i>
                                </div>
                              </div>
                              <div className="replyContent" >
                                <h3>{x.name}</h3>
                                <p>{x.email}</p>
                                <p>{x.reply}</p>
                                <div className="date">
                                  <p>{x.date}</p>
                                </div>
                              </div>

                            </div>
                          ))
                        )
                      }


                    </div>
                  )
                })}
              </div>
            </>
            }
          </div>
        </div>
      </div>

    </div>
  )
}
