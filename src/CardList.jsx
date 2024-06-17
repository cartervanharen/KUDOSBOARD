import './global.css'
import { useState, useEffect } from "react";


const CardList = ({sortoption}) => {
  const [currentsortmethod, setCurrentsortmethod] = useState("");

  useEffect(() => {
    setCurrentsortmethod(sortoption);
  }, [sortoption]);

  console.log(currentsortmethod);

  return (
    <>
      <p>{currentsortmethod}</p>
    </>
  );
};


export default CardList;