import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
//import { plusNumber, minusNumber } from "./actions";

const App = () => {
  
  const mystate = useSelector((stat) => stat.changeNumber2);
  const mystate2 = useSelector((stat) => stat.changeNumber);

  const dispatch = useDispatch();

  return (
    <>
      <div className="container">
        <h1>Increment/Decrement counter</h1>
        <h4>Redux Testing</h4>

        <div className="quantity">
          <a
            className="quantity__minus"
            title="Decrement"
            onClick={() => dispatch({ type: "DECREMENT" })}
          >
            <span>-</span>
          </a>
          <input
            name="quantity"
            type="text"
            className="quantity__input"
            value={mystate}
          />
          <input
            name="quantity"
            type="text"
            className="quantity__input"
            value={mystate2}
          />
          <a
            className="quantity__plus"
            title="Increment"
            onClick={() => dispatch({ type: "INCREMENT" })}
          >
            <span>+</span>
          </a>
        </div>
      </div>
    </>
  );
};
export default App;