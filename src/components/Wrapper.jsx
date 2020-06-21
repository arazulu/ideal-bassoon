import React, { useState, useEffect } from "react";
import UserBoard from "./UserBoard";

const Wrapper = () => {
  let saved = sessionStorage.getItem("savedState");
  saved = JSON.parse(saved);
  if (saved === null) {
    saved = [];
  }
  const [getUsers, setUsers] = useState(saved);
  const [newUser, addUser] = useState("");

  const addUserHandler = (e) => {
    e.preventDefault();
    if (newUser === "") return;
    for (let x of getUsers) {
      if (x.user === newUser) return;
    }
    let users = { user: newUser, cards: [] };

    setUsers((prevState) => [...prevState, users]);
    document.getElementById("form").reset();
  };

  const addCard = (e) => {
    let response = window.prompt("please add some text");
    let userIndex = e.target.name;
    if (response === null) return;

    setUsers((prevState) => {
      const users = JSON.parse(JSON.stringify(prevState));
      if (response === "") return users;
      users[userIndex].cards.push(response);
      return users;
    });
  };

  const moveCard = (cardIndex, userIndex, direction) => {
    let targetIndex = userIndex + direction;
    if (targetIndex < 0 || targetIndex >= getUsers.length) return;

    setUsers((prevState) => {
      let state = JSON.parse(JSON.stringify(prevState));
      let moved = state[userIndex].cards.splice(cardIndex, 1);
      state[targetIndex].cards.push(moved);
      return state;
    });
  };

  const allUsers = getUsers.map((curr, i) => {
    return (
      <UserBoard
        key={`user ${i}`}
        name={curr.user}
        cards={curr.cards}
        userIndex={i}
        addCard={addCard}
        moveCard={moveCard}
      />
    );
  });

  useEffect(() => {
    sessionStorage.setItem("savedState", JSON.stringify(getUsers));
  });

  return (
    <div id="wrapper">
      <form id="form" onSubmit={addUserHandler}>
        <input
          type="text"
          onChange={(e) => addUser(e.target.value)}
          placeholder="Enter New User..."
        ></input>
        <button type="submit">Submit</button>
      </form>
      <div id="container">
        {allUsers !== null ? allUsers : "need to add users"}
      </div>
    </div>
  );
};

export default Wrapper;
