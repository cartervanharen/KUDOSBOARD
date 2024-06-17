import "./global.css";
import { useState, useEffect } from "react";
import MakeCard from "./makecard.jsx";
import image from "/Users/cartervanharen/Desktop/Codepath/Week3/KUDOSBOARD/src/assets/test.png";

let counter = 0;
const CardList = ({ sortoption }) => {
  const [currentsortmethod, setCurrentsortmethod] = useState("");

  useEffect(() => {
    if (sortoption !== currentsortmethod) {
      setCurrentsortmethod(sortoption);
      console.log(currentsortmethod);
    }
    console.log("repete");
  }, [sortoption, currentsortmethod]);

  counter++;

  return (
    <>
      <div id="listofcards">
        <MakeCard
          url={image}
          title={"Happy Birthday Carter"}
          cardtype={"Thank you"}
        />

        <MakeCard
          url={image}
          title={"Happy Birthday Carter"}
          cardtype={"Thank you"}
        />

        <MakeCard
          url={image}
          title={"Happy Birthday Carter"}
          cardtype={"Thank you"}
        />
      </div>

      <p>{currentsortmethod}</p>
    </>
  );
};

export default CardList;
