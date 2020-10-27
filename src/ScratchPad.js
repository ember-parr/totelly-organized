import React, { useState, createContext } from "react";

export const FriendContext = createContext();

export const FriendProvider = (props) => {
  const [friends, setFriends] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");

  const getFriends = () => {
    return fetch("http://localhost:8088/friends?_expand=user")
      .then((res) => res.json())
      .then(setFriends);
  };

  const addFriend = (friendObj) => {
    return fetch("http://localhost:8088/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(friendObj),
    }).then(getFriends);
  };

  const deleteFriend = (id) => {
    return fetch(`http://localhost:8088/friends/${id}`, {
      method: "DELETE",
    }).then(getFriends);
  };

  const getFriendById = (id) => {
    return fetch(
      `http://localhost:8088/friends/${id}?_expand=user`
    ).then((res) => res.json());
  };

  return (
    <FriendContext.Provider
      value={{
        friends,
        setFriends,
        getFriends,
        getFriendById,
        addFriend,
        deleteFriend,
        searchTerms,
        setSearchTerms,
      }}
    >
      {props.children}
    </FriendContext.Provider>
  );
};