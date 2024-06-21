import React, { useState, useEffect } from 'react';
import { addComment, getCommentsByCardId } from './dbcalls';
import "./global.css";


const CardModal = ({ card, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentsByCardId(card.cardid);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, [card.cardid]); 

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const addedComment = await addComment(card.cardid, newComment);
        setComments([...comments, addedComment]); 
        setNewComment(''); 
        onClose(); 
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    } else {
      alert("Please enter a comment.");
    }
  };

  return (
    <div className="modal2">
      <div className="modal-content2">
        <span className="close" onClick={onClose}>X</span>
        <h3>{card.cardtitle}</h3>
        <p>{card.carddescription}</p>
        <img src={card.image} alt={card.cardtitle} />
        <div>
          {comments.map((comment, index) => (
            <p key={index}>{comment.comment}</p> 
          ))}
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;