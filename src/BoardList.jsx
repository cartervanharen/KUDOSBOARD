import React, { useState, useEffect } from "react";
import axios from "axios";
import MakeCard from "./makecard.jsx";
import "./global.css";
import {
  fetchAllCards,
  fetchAllBoards,
  fetchAllUsers,
  addUser,
  deleteCard,
  deleteAllCardsFromBoard,
  deleteBoard,
  addCard,
  addBoard,
  getUserFromBoardId,
  getBoardsFromUserId,
  getCardsFromUserId,
} from "./dbcalls.jsx";

const CardList = ({ sortoption }) => {
  const [boards, setBoards] = useState([]);
  const [currentSortMethod, setCurrentSortMethod] = useState("");

  useEffect(() => {
    if (sortoption !== currentSortMethod) {
      setCurrentSortMethod(sortoption);
      console.log(currentSortMethod);
    }
  }, [sortoption, currentSortMethod]);

  useEffect(() => {
    const fetchBoards = async () => {
      const fetchedBoards = await fetchAllBoards();
      setBoards(fetchedBoards);
    };
    fetchBoards();
  }, []);

  return (
    <>
      <div id="listofcards">
        
        {boards.map((board) => (
          <MakeCard
            key={board.boardid} //completely useless but it gets rid of warnings
            boardsid={board.boardid}
            url={board.image}
            title={board.title}
            cardtype={board.type}
            message={board.message}
          />
        ))}
      </div>

      <p>{currentSortMethod}</p>
    </>
  );
};

export default CardList;
