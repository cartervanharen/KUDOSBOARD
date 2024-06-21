import React, { useState } from "react";
import "./global.css";
import { addBoard } from "./dbcalls";

const Modal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    type: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchGifs = async () => {
    const apiKey = "FAvsBVmmN8QM4gCrFISwdii4g4qyXQTu";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=15`;
    const response = await fetch(url);
    const { data } = await response.json();

    setGifs(data);
  };

  const selectGif = (gifUrl) => {
    setFormData((prevState) => ({
      ...prevState,
      image: gifUrl,
    }));
    setGifs([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 1;

    await addBoard(formData.type, formData.title, formData.image, userId);
    setFormData({
      title: "",
      image: "",
      type: "",
    });
    closeModal();
    window.location.reload();
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
              required
              maxLength={18}
              value={formData.title}
              onChange={handleChange}
            />
          </div>



          <div>
            <label>Author : </label>
            <input
              type="author"
              id="author"
              name="author"
            />
          </div>

          
          <div>
            <label htmlFor="search">Search Giphy: </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              required
              onChange={handleSearchChange}
            />
            <button
              style={{ margin: "10px" }}
              type="button"
              onClick={searchGifs}
            >
              Search
            </button>
          </div>

          <div>
            {gifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
                onClick={() => selectGif(gif.images.fixed_height.url)}
                style={{ cursor: "pointer", width: 100, height: 100 }}
              />
            ))}
          </div>

          <div>
            <label htmlFor="image">Image Url: </label>
            <input
              type="text"
              id="image"
              required
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="type">Type: </label>
            <select
              id="type"
              required
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select a Type</option>
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
