import React, { useState, createContext } from "react";

export const ConnectionContext = createContext();

export const ConnectionProvider = (props) => {
    const [connections, setConnection] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");

    const getConnection = () => {
        return fetch("http://localhost:8088/connectedUsers?_expand=user")
        .then((res) => res.json())
        .then(setConnection);
    };

    const addConnection = (connectionObj) => {
        return fetch("http://localhost:8088/connectedUsers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(connectionObj),
        }).then(getConnection);
    };

    const deleteConnection = (id) => {
        return fetch(`http://localhost:8088/connectedUsers/${id}`, {
        method: "DELETE",
        }).then(getConnection);
    };

    const getConnectionById = (id) => {
        return fetch(
        `http://localhost:8088/connectedUsers/${id}?_expand=user`
        ).then((res) => res.json());
    };

    const updateConnection = (id) => {
        return fetch(`http://localhost:8088/connectedUsers/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Location)
        })
    }

    return (
        <ConnectionContext.Provider
        value={{
            connections,
            setConnection,
            getConnection,
            getConnectionById,
            addConnection,
            deleteConnection,
            searchTerms,
            setSearchTerms,
            updateConnection
        }}
        >
        {props.children}
        </ConnectionContext.Provider>
    );
};