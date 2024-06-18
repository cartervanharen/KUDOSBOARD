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
  deleteBoard,
  addCard,
  addBoard,
  getUserFromBoardId,
  getBoardsFromUserId,
  getCardsFromUserId,
} from "./dbcalls";

const CardList = ({ sortoption }) => {
  const [boards, setBoards] = useState([]); // Renamed to boards for clarity
  const [currentSortMethod, setCurrentSortMethod] = useState("");

  useEffect(() => {
    if (sortoption !== currentSortMethod) {
      setCurrentSortMethod(sortoption);
      console.log(currentSortMethod);
    }
    console.log("repeat");
  }, [sortoption, currentSortMethod]);

  useEffect(() => {
    const fetchBoards = async () => {
      const fetchedBoards = await fetchAllBoards(); // Correctly await the fetching of boards
      setBoards(fetchedBoards); // Set the fetched boards
    };
    fetchBoards();
  }, []);

  return (
    <>
      <div id="listofcards">
        {boards.map((board) => ( // Correctly map over boards
          <MakeCard
            key={board.id} // Ensure the key is correctly using board.id
            url={board.image}
            title={board.title}
            cardtype={board.type}
            message={board.message} // Ensure the board object has a message property, or adjust as needed
          />
        ))}
      </div>

      <p>{currentSortMethod}</p>
    </>
  );
};

export default CardList;