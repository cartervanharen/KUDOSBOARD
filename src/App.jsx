import "./global.css";
import CardList from "./CardList.jsx";
import { useState } from "react";

function App() {
  const [SortMethod, setSortMethod] = useState("");

  const handleButtonClick = (sortMethod) => {
    setSortMethod(sortMethod);
  };

  return (
    <>
      <div id="wholepage">
        <div id="mainheader">
          <h1 id="headertext">KUDOBOARD</h1>

          <div>
            <button className="standardbutton" onClick={() => handleButtonClick("all")}>All</button>

            <button className="standardbutton" onClick={() => handleButtonClick("recent")}>Recent</button>

            <button className="standardbutton" onClick={() => handleButtonClick("celly")}>
              Celebration
            </button>

            <button className="standardbutton" onClick={() => handleButtonClick("thanks")}>Thank You</button>

            <button className="standardbutton" onClick={() => handleButtonClick("inspiration")}>Inspiration</button>
          </div>

          <button className="standardbutton" >New Board</button>
        </div>

        <CardList sortoption={SortMethod} />
      </div>
    </>
  );
}

export default App;