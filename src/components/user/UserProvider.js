import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
	const [Users, setUsers] = useState([])
	const [ConnectedUsers, setConnectedUsers] = useState([])
	const [searchTerms, setSearchTerms] = useState("")

	const getUsers = () => {
		return fetch("http://localhost:8088/users")
			.then((res) => res.json())
			.then(setUsers);
	};

	const getUserConnections = () => {
	return fetch(`http://localhost:8088/connectedUsers?_expand=connectedUser&_expand=user`)
		.then((res)=>res.json())
		.then(setConnectedUsers)
	}	

	const getUserById = (id) => {
	return fetch(`http://localhost:8088/users/${id}`).then((res) => res.json());
	};
	

	return (
		<UserContext.Provider
			value={{
				Users, setUsers, getUsers, setSearchTerms, searchTerms, getUserConnections, setConnectedUsers, ConnectedUsers, getUserById
			}}>
			{props.children}
		</UserContext.Provider>
	);
};



// const getUserById = (id) => {
// 	return fetch(`http://localhost:8088/users/${id}`).then((res) => res.json());
// };

// const getUserConnections = () => {
// 	return fetch(`http://localhost:8088/connectedUsers?_expand=connectedUser&_expand=user`).then((res)=>res.json(setConnectedUsers))
// }

// const getConnectionRequsts = () => {
// 	return fetch(`http://localhost:8088/connectedUsers?status=false&connectedUserId=${currentUser}`).then((res)=>res.json(setConnectedUsers))
// }