import React, { useState } from "react";
import "./global.css";

const Modal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    Category: "",
  });

  const initialFormData = {
    title: "",
    Category: "",
  };

  const handleChange = (e) => {
    const { title, Category } = e.target;
    addBoard();

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(initialFormData);
    closeModal();

    console.log("Form Data Submitted:", formData);
  };

  const userRoles = ["Recent", "Celebration", "Thank You", "Inspiration"];

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
            <label htmlFor="Category">Category: </label>
            <select
              id="Category"
              name="Category"
              value={formData.Category}
              onChange={handleChange}
            >
              <option value="">Select a Category</option>
              {userRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
