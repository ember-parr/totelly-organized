import React, { useState, createContext } from "react"

export const ItemContext = createContext()

export const ItemProvider = (props) => {
    const [Items, setItems] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getItems = () => {
        return fetch(`http://localhost:8088/items?_expand=location&_expand=category&_expand=user`)
        .then(result => result.json())
        .then(setItems)
    }

    const getSelectItems = () => {
        return fetch(`http://localhost:8088/items?_expand=location&_expand=category&_expand=user`)
        .then(result => result.json())
        
    }
    const addItem = Item => {
        return fetch("http://localhost:8088/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Item)
        })
    }

    const getItemById = (id) => {
        return fetch(`http://localhost:8088/items/${id}?_expand=user`)
        .then(result => result.json())
    }

    const getUsersItems = (userId) => {
        return fetch(`http://localhost:8088/items?userId=${userId}&_expand=location&_expand=category&_expand=user`)
        .then(result => result.json())
        
    }

    const getItemsByLocation = (locationId) => {
        return fetch(`http://localhost:8088/items?locationId=${locationId}&_expand=location&_expand=category&_expand=user`)
        .then(result => result.json())
    }

    const getMostRecentItem = () => {
        return fetch(`http://localhost:8088/items?_sort=id&_order=desc&_limit=1`)
        .then(result => result.json())
    }

    const deleteItem = ItemId => {
        return fetch(`http://localhost:8088/items/${ItemId}`, {
            method: "DELETE"
        })
    }

    const updateItem = Item => {
        return fetch(`http://localhost:8088/items/${Item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Item)
        })
    }

    return (
        <ItemContext.Provider value={{
            Items, getSelectItems, getUsersItems, getItems, addItem, getItemById, deleteItem, updateItem, setSearchTerms, searchTerms, getMostRecentItem, getItemsByLocation
        }}>
            {props.children}
        </ItemContext.Provider>
    )
}