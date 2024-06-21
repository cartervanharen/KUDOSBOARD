import React, { useState } from "react";
import "./global.css";
import CardList from "./BoardList.jsx";
import NewCardModal from "./newboardmodal.jsx";

function Home() {
  const [sortMethod, setSortMethod] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
          <input
            type="text"
            style={{ width: "400px" }}
            placeholder="Search boards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="standardbutton" onClick={openModal}>
            New Board
          </button>
        </div>
        {isModalOpen && <NewCardModal closeModal={closeModal} />}
        <CardList sortoption={sortMethod} searchQuery={searchQuery} />
      </div>

      <div className="footer">
        <p>This is a footer. - Carter VanHaren</p>
      </div>
    </>
  );
}

export default Home;
