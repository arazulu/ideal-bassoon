import React from "react";
import Card from "./Card";

const UserBoard = (props) => {
  const { name, cards, userIndex, moveCard, addCard } = props;

  const allCards = cards.map((curr, i) => {
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
        <button className="btn-add" name={userIndex} onClick={addCard}>
          {/* <span alt="add button" src="src/assets/plus-sign.svg"></span> */}
        </button>
      </div>
    </div>
  );
};

export default UserBoard;
