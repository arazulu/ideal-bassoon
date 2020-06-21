import React from "react";

const Card = (props) => {
  const { card, cardIndex, userIndex, moveCard } = props;

  return (
    <div className="card">
      <button
        className="left button"
        onClick={() => {
          moveCard(cardIndex, userIndex, -1);
        }}
      ></button>
      <p>{card}</p>
      <button
        className="right button"
        onClick={() => {
          moveCard(cardIndex, userIndex, 1);
        }}
      ></button>
    </div>
  );
};

export default Card;
