import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./home.jsx";
import Board from "./board.jsx";
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
  getCardsFromBoardId,
} from "./dbcalls";
function App() {
  localStorage.setItem("test", "1234");

  const value = localStorage.getItem("test");

  console.log(value); 

  const [boards, setBoards] = useState([]);

  useEffect(() => {
    async function fetchBoards() {
      const boards = await fetchAllBoards();
      setBoards(boards);
    }
    fetchBoards();
  }, []);
  console.log(boards);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {boards.map((board) => (
          <Route
            key={board.boardid}
            path={`/boards/${board.boardid}`}
            element={<Board board={board} />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
