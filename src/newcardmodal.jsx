import React, { useState } from "react";
import { addCard } from "./dbcalls";
import "./global.css";

const CardModal = ({ closeModal, boardId }) => {
  const [formData, setFormData] = useState({
    cardtitle: "",
    carddescription: "",
    image: "",
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
    const likes = 0;
    await addCard(
      userId,
      boardId,
      formData.cardtitle,
      formData.carddescription,
      formData.image,
      likes
    );
    closeModal();
    window.location.reload();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        <h2>Create New Card</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cardtitle">Title: </label>
            <input
              type="text"
              id="cardtitle"
              name="cardtitle"
              required
              value={formData.cardtitle}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="carddescription">Description: </label>
            <input
              type="text"
              id="carddescription"
              name="carddescription"
              required
              value={formData.carddescription}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="search">Search Giphy: </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="button" onClick={searchGifs}>
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
            <label htmlFor="image">Image URL: </label>
            <input
              type="text"
              id="image"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Create Card</button>
        </form>
      </div>
    </div>
  );
};

export default CardModal;
