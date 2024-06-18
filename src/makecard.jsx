import "./global.css";
import PropTypes from "prop-types";

const MakeCard = (props) => {
  //   const handleLikeClick = (event) => {
  //     event.stopPropagation();
  //     props.onLike();
  //   };

  //   const handleWatchedClick = (event) => {
  //     event.stopPropagation();
  //     props.onWatched();
  //   };

  return (
    <div className="cardbox">
      {/* {console.log(props.url)} */}
      <img className="imageincard" src={props.url} />
      <p>{props.title}</p>
      <div>
        <p>{props.cardtype}</p>

        <button className="standardbutton">View Board </button>

        <button className="standardbutton">Delete</button>
      </div>
    </div>
  );
};

MakeCard.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  cardtype: PropTypes.string.isRequired,
  //   id: PropTypes.string.isRequired,
};

export default MakeCard;
