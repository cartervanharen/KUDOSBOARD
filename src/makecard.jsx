import "./global.css";
import PropTypes from "prop-types";
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

const MakeCard = (props) => {
  // const handleLikeClick = (event) => {
  //   event.stopPropagation();
  //   props.onLike();

  // };

  const deletebuttonclick = (event) => {
    event.stopPropagation();
    deleteBoard(props.boardsid);
    window.location.reload(); //Change this eventually


  };

  return (
    <div className="cardbox">
      {/* {console.log(props.url)} */}
      <img className="imageincard" src={props.url} />
      <p>{props.title}</p>
      <div>
        <p>{props.cardtype}</p>

        <button className="standardbutton">View Board </button>

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
  //   id: PropTypes.string.isRequired,
};

export default MakeCard;
