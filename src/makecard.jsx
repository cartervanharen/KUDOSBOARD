import React from "react";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
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

const MakeCard = (props) => {
  const navigate = useNavigate();

  const deletebuttonclick = (event) => {
    event.stopPropagation();

    setTimeout(async () => {
      deleteAllCardsFromBoard(props.boardsid);
      deleteBoard(props.boardsid);
      window.location.reload();
    }, 800);
  };

  const viewBoard = (event) => {
    event.stopPropagation();
    const linkUrl = `/boards/${props.boardsid}`;
    navigate(linkUrl);
  };

  return (
    <div className="cardbox">
      <img className="imageincard" src={props.url} alt={props.title} />
      <p>{props.title}</p>
      <div className="cardbuttonsbottom">
        <p>{props.cardtype}</p>
        <button className="standardbutton" onClick={viewBoard}>
          View Board
        </button>
        <button className="standardbutton" onClick={deletebuttonclick}>
          Delete
        </button>
      </div>
    </div>
  );
};

MakeCard.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  boardsid: PropTypes.number.isRequired,
  cardtype: PropTypes.string.isRequired,
};

export default MakeCard;
