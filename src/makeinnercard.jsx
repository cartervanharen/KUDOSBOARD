import React, { useState, useEffect } from "react";
import { deleteCard, getLikesFromCard, addLikeToCard } from "./dbcalls";
import CardModal from "./commentmodal.jsx";

const MakeInnerCard = ({ card }) => {
  const [likes, setLikes] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const fetchedLikes = await getLikesFromCard(card.cardid);
        setLikes(fetchedLikes.likes);
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };

    fetchLikes();
  }, [card.cardid]);

  const deleteButtonClick = async (event) => {
    event.stopPropagation();
    await deleteCard(card.cardid);

    console.log(card.cardid);

    setTimeout(async () => {
      window.location.reload();
    }, 100);
  };

  const likeClick = async (event) => {
    event.stopPropagation();
    try {
      const newLikes = likes + 1;
      await addLikeToCard(card.cardid, newLikes);
      setLikes(newLikes);
    } catch (error) {
      console.error("Failed to add like:", error);
    }
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="gridcardinboard"
      key={card.cardid}
      onClick={handleCardClick}
    >
      <h3 className="carddiscrip">{card.cardtitle}</h3>
      <p className="carddiscrip">{card.carddescription}</p>
      <p>Likes: {likes}</p>
      <img src={card.image} alt={card.cardtitle} className="cardimage" />
      <div>
        <button className="standardbutton" onClick={likeClick}>
          Like
        </button>
        <button className="standardbutton" onClick={deleteButtonClick}>
          Delete
        </button>
      </div>
      {showModal && <CardModal card={card} onClose={handleCloseModal} />}
    </div>
  );
};

export default MakeInnerCard;
