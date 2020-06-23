import React, { useState, useEffect } from "react";
import UserBoard from "./UserBoard";

type User = {
  user: string;
  cards: string[];
};

const Wrapper: React.FC = () => {
  let saved: Array<User> | [];
  sessionStorage.getItem("savedState") === null
    ? (saved = [])
    : (saved = JSON.parse(sessionStorage.getItem("savedState")!));

  const [getUsers, setUsers] = useState(saved);
  const [newUser, addUser] = useState("");

  const addUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUser === "") return;
    for (let x of getUsers) {
      if (x.user === newUser) return;
    }
    let users = { user: newUser, cards: [] };

    setUsers((prevState) => [...prevState, users]);
    let form = document.getElementById("form") as HTMLFormElement;
    form.reset();
  };

  // React.FormEvent<HTMLFormElement>
  const addCard = (e: React.MouseEvent<Element, MouseEvent>) => {
    let response = window.prompt("please add some text");
    let userIndex = (e.target as HTMLInputElement).value;
    if (response === null) return;

    setUsers((prevState) => {
      const users = JSON.parse(JSON.stringify(prevState));
      if (response === "") return users;
      users[userIndex].cards.push(response);
      return users;
    });
  };

  const moveCard = (
    cardIndex: number,
    userIndex: number,
    direction: number
  ) => {
    let targetIndex = userIndex + direction;
    if (targetIndex < 0 || targetIndex >= getUsers.length) return;

    setUsers((prevState) => {
      let state = JSON.parse(JSON.stringify(prevState));
      let moved = state[userIndex].cards.splice(cardIndex, 1);
      state[targetIndex].cards.push(moved);
      return state;
    });
  };

  const allUsers: JSX.Element[] = [...getUsers].map(
    (curr: { user: string; cards: string[] }, i: number) => {
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
    }
  );

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
