import React, { useState } from "react";
import "./global.css";
import CardList from "./CardList.jsx";
import NewCardModal from "./newcardmodal.jsx";

import { fetchAllUsers, addUser, deleteCard } from "./dbcalls";

console.log(fetchAllUsers());

function App() {
  const [SortMethod, setSortMethod] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = (sortMethod) => {
    setSortMethod(sortMethod);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div id="wholepage">
        <div id="mainheader">
          <h1 id="headertext">KUDOBOARD</h1>
          <div>
            <button
              className="standardbutton"
              onClick={() => handleButtonClick("all")}
            >
              All
            </button>
            <button
              className="standardbutton"
              onClick={() => handleButtonClick("recent")}
            >
              Recent
            </button>
            <button
              className="standardbutton"
              onClick={() => handleButtonClick("celly")}
            >
              Celebration
            </button>
            <button
              className="standardbutton"
              onClick={() => handleButtonClick("thanks")}
            >
              Thank You
            </button>
            <button
              className="standardbutton"
              onClick={() => handleButtonClick("inspiration")}
            >
              Inspiration
            </button>
          </div>
          <button className="standardbutton" onClick={openModal}>
            New Board
          </button>
        </div>
        {isModalOpen && <NewCardModal closeModal={closeModal} />}
        <CardList sortoption={SortMethod} />
      </div>
    </>
  );
}

export default App;
