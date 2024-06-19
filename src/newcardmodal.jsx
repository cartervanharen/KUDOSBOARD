import React, { useState } from "react";
import "./global.css";
import {
  fetchAllCards,
  fetchAllBoards,
  fetchAllUsers,
  addUser,
  deleteCard,
  deleteBoard,
  addCard,
  addBoard,
  getUserFromBoardId,
  getBoardsFromUserId,
  getCardsFromUserId,
} from "./dbcalls";

const Modal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    type: "",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 1;
    await addBoard(formData.type, formData.title, formData.image, userId);
    console.log("Form Data Submitted:", formData);
    setFormData({
      title: "",
      image: "",
      type: "",
    });
    closeModal();
    window.location.reload(); //band aid fix
  };

  return (
    <div className="modalnewcard-backdrop">
      <div className="modalnewcard-content">
        <button className="modalnewcardclose-button" onClick={closeModal}>
          X
        </button>
        <h2>Create New Card</h2>
        <p>
          Your card will be created under a guest account if you don't sign in.
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="image">Image Url: </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="type">Type: </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select a Type</option>
              <option value="Recent">Recent</option>
              <option value="Celebration">Celebration</option>
              <option value="Thank You">Thank You</option>
              <option value="Inspiration">Inspiration</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
