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
    navigate('/'); 
  };

  return (
    <div className="wholeboardpage">
      <button onClick={gohome}>Home</button>

      <h1>{board.boardid}</h1>

      <p style={{ color: "black" }}>{board.type}</p>
      <p style={{ color: "black" }}>{board.userId}</p>
      <p style={{ color: "black" }}>{board.image}</p>

      <button onClick={openModal}>Create New Card</button>
      <br></br>
      <div className="flexboxforcards">
        {cards.length > 0 ? (
          cards.map((card) => <Makeinnercard key={card.cardid} card={card} />)
        ) : (
          <p>No cards available for this board.</p>
        )}
      </div>

      {isModalOpen && (
        <CardModal closeModal={closeModal} boardId={board.boardid} />
      )}
    </div>
  );
};

export default Board;
