import React from "react";

type MyProps = {
  card: string;
  cardIndex: number;
  userIndex: number;
  moveCard: (cardIndex: number, userIndex: number, direction: number) => void;
};

const Card: React.FC<MyProps> = ({ card, cardIndex, userIndex, moveCard }) => {
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
