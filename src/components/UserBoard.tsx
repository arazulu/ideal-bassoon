import React from "react";
import Card from "./Card";

type MyProps = {
  name: string;
  cards: string[] | [];
  userIndex: number;
  moveCard: (cardIndex: number, userIndex: number, direction: number) => void;
  addCard: (e: React.MouseEvent<Element, MouseEvent>) => void;
};
//React.FormEvent<HTMLFormElement>
const UserBoard: React.FC<MyProps> = ({
  name,
  cards,
  userIndex,
  moveCard,
  addCard,
}) => {
  const allCards = [...cards].map((curr: string, i: number) => {
    return (
      <Card
        key={`card ${i}`}
        card={curr}
        cardIndex={i}
        userIndex={userIndex}
        moveCard={moveCard}
      />
    );
  });
  return (
    <div className="userboard">
      <div className="user-header">{name}</div>
      <div className="cards-wrapper">
        {allCards.length >= 1 ? allCards : "..."}
      </div>
      <div className="btn-wrapper">
        <button
          className="btn-add"
          value={userIndex}
          onClick={addCard}
        ></button>
      </div>
    </div>
  );
};

export default UserBoard;
