import React, { useState, useEffect } from "react";
import { deleteCard, getLikesFromCard, addLikeToCard } from "./dbcalls";

const MakeInnerCard = ({ card }) => {
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      const fetchedLikes = await getLikesFromCard(card.cardid);
      setLikes(fetchedLikes.likes);
    };

    fetchLikes();
  }, [card.cardid]);

  const deleteButtonClick = (event) => {
    event.stopPropagation();

    setTimeout(async () => {
      await deleteCard(card.cardid);
      window.location.reload();
    }, 400);
  };

  const likeclick = async (event) => {
    event.stopPropagation();
    const newLikes = likes + 1;
    await addLikeToCard(card.cardid, newLikes);
    setLikes(newLikes);
  };

  return (
    <div className="gridcardinboard" key={card.cardid}>
      <h3 className="carddiscrip">{card.cardtitle}</h3>
      <p className="carddiscrip">{card.carddescription}</p>
      <p>Likes: {likes}</p>
      <img src={card.image} alt={card.cardtitle} className="cardimage" />
      <div>
        <button className="standardbutton" onClick={likeclick}>
          Like
        </button>
        <button className="standardbutton" onClick={deleteButtonClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MakeInnerCard;
