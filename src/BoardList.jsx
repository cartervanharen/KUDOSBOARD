import React, { useState, useEffect } from "react";
import axios from "axios";
import MakeCard from "./makecard.jsx";
import "./global.css";
import { fetchAllBoards } from "./dbcalls.jsx";

const CardList = ({ sortoption, searchQuery }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const fetchedBoards = await fetchAllBoards();
        setBoards(fetchedBoards);
      } catch (error) {
        console.error("Failed to fetch boards:", error);
      }
    };
    fetchBoards();
  }, []);

  const filteredBoards = boards.filter((board) => {
    const matchesSearch = board.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (sortoption === "thanks") {
      return matchesSearch && board.type === "Thank You";
    }

    if (sortoption === "celly") {
      return matchesSearch && board.type === "Celebration";
    }

    if (sortoption === "recent") {
      return matchesSearch && board.type === "Recent";
    }

    if (sortoption === "inspiration") {
      return matchesSearch && board.type === "Inspiration";
    }

    return matchesSearch;
  });

  return (
    <div id="listofcards">
      {filteredBoards.map((board) => (
        <MakeCard
          key={board.boardid}
          boardsid={board.boardid}
          url={board.image}
          title={board.title}
          cardtype={board.type}
          message={board.message}
        />
      ))}
    </div>
  );
};

export default CardList;