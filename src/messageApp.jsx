import React, { useState,useEffect } from "react";
import "./App.css";

const Message = () => {
  const [filesCount, setfilesCount] = useState(5);

  useEffect(() => {
    alert("count is equal to " + filesCount);
  }, [filesCount]);

  return (
    <>
      <Files filesCount={filesCount} setfilesCount={setfilesCount} />
    </>
  );
};

export default Message;

const Files = ({ filesCount, setfilesCount }) => {
  return (
    <>
      <div className="container">
        <div className="quantity">
          <a
            className="quantity__minus"
            onClick={() => setfilesCount(filesCount - 1)}
          >
            <span>-</span>
          </a>
          <input
            name="quantity"
            type="text"
            className="quantity__input"
            value={filesCount}
          />
          <a
            className="quantity__plus"
            onClick={() => setfilesCount(filesCount + 1)}
          >
            <span>+</span>
          </a>
        </div>
      </div>
    </>
  );
};