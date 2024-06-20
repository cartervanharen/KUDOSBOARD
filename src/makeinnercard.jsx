import React from "react";
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
    deleteAllCardsFromBoard,
  } from "./dbcalls";

const makeinnercard = ({ card }) => {
  const deletebuttonclick = (event) => {
    event.stopPropagation();
    deleteAllCardsFromBoard(props.boardsid);

    window.location.reload();
  };

  return (
    <div className="gridcardinboard" key={card.cardid}>
      <h3>{card.cardtitle}</h3>
      <p>{card.carddescription}</p>
      <img
        src={card.image}
        alt={card.cardtitle}
        style={{ width: "100px", height: "100px" }}
      />

      <button className="standardbutton">
        Comments
      </button>
      <button className="standardbutton" onClick={deletebuttonclick}>
        Delete
      </button>
    </div>
  );
};

export default makeinnercard;
