// Board.js
import React, { useState, useEffect } from "react";
import CardModal from "./newcardmodal";
import Makeinnercard from "./makeinnercard";
import { getCardsFromBoardId } from "./dbcalls";
import { useNavigate } from "react-router-dom";

const Board = ({ board }) => {
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const fetchedCards = await getCardsFromBoardId(board.boardid);
        setCards(fetchedCards);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    };

    fetchCards();
  }, [board.boardid]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const gohome = (event) => {
    event.stopPropagation();
    navigate("/");
  };

  return (
    <div className="wholeboardpage">
      <div className="headerboard">
        <p className="headertextboards">{board.title}</p>

        <button className="headerbutton" onClick={gohome}>
          Home
        </button>
        <button className="headerbuttonwide" onClick={openModal}>
          New Card
        </button>
      </div>

      <br></br>
      <div className="flexboxforcards">
        {cards.length > 0 ? (
          cards.map((card) => <Makeinnercard key={card.cardid} card={card} />)
        ) : (
          <p style={{ padding: "50px" }}>No cards available for this board.</p>
        )}
      </div>

      {isModalOpen && (
        <CardModal closeModal={closeModal} boardId={board.boardid} />
      )}
    </div>
  );
};

export default Board;
