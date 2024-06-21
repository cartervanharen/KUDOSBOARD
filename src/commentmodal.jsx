import React, { useState, useEffect } from "react";
import { addComment, getCommentsByCardId } from "./dbcalls";
import "./global.css";

const CardModal = ({ card, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentsByCardId(card.cardid);
        setComments(fetchedComments || []);
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
        if (addedComment && addedComment.comment) {
          setComments(prevComments => [...prevComments, addedComment]);
          setNewComment("");
          window.location.reload(); 
        } else {
            window.location.reload(); 
        }
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    } else {
      alert("Please enter a comment.");
    }
  };

  const handleModalContentClick = (event) => {
    event.stopPropagation();
  };

  const handleModalClick = () => {
    onClose();
  };

  return (
    <div className="modal2" onClick={handleModalClick}>
      <div className="modal-content2" onClick={handleModalContentClick}>
        <span className="close" onClick={onClose}>X</span>
        <h3>{card.cardtitle}</h3>
        <p>{card.carddescription}</p>
        <img src={card.image} alt={card.cardtitle} />
        <div>

        <h3>Comments</h3>

          {comments.map((comment) => (
            <p key={comment.commentid}>{comment.comment || "No comment text available"}</p>
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