import React, { useState, useEffect } from "react";
import CardModal from "./newcardmodal"; // Import the CardModal component
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
const Board = ({ board }) => {
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

  return (
    <div>
      <h1>{board.boardid}</h1>
      <p style={{ color: "black" }}>{board.type}</p>
      <p style={{ color: "black" }}>{board.userId}</p>
      <p style={{ color: "black" }}>{board.image}</p>
      <button onClick={openModal}>Create New Card</button>
      <div className="flexboxforcards">
        <h2>Cards</h2>
        {cards.length > 0 ? (
          cards.map((card) => (
            <div className="gridcardinboard" key={card.cardid}>
              <h3>{card.cardtitle}</h3>
              <p>{card.carddescription}</p>
              <img
                src={card.image}
                alt={card.cardtitle}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          ))
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
