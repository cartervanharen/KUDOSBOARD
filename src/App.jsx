import "./global.css";
import CardList from "./CardList.jsx";
import { useState } from "react";


function App() {

  const [SortMethod, setSortMethod] = useState("");


  const selectrecent = () => {
    setSortMethod("recent");
    }




  return (
    <>
      <div id="wholepage">
        <div id="mainheader">
          <h1 id="headertext">KUDOBOARD</h1>

          <div>
            <button className="standardbutton">All</button>

            <button className="standardbutton">Recent</button>

            <button className="standardbutton" onClick={selectrecent}>Celebration</button>

            <button className="standardbutton">Thank You</button>

            <button className="standardbutton">Inspiration</button>
          </div>


          <button className="standardbutton">New Board</button>


        </div>

        <CardList sortoption={SortMethod}/>



      </div>
    </>
  );
}

export default App;
