import React, { useState, createContext } from "react"

export const FeedContext = createContext()

export const FeedProvider = (props) => {
    const [Activities, setActivities] = useState([])
    const [Personals, setPersonals] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const currentUser = parseInt(localStorage.user)

    const getActivities = () => {
        return fetch(`http://localhost:8088/feed?_sort=date&_order=desc&_limit=10`)
        .then(result => result.json())
        .then(setActivities)
    }

    const getCurrentUserActivities = () => {
        return fetch(`http://localhost:8088/feed?userId=${currentUser}&_sort=date&_order=desc&_limit=5`)
        .then(result => result.json())
        .then(setActivities)
    }


    const getItemActivities = (id) => {
        return fetch(`http://localhost:8088/feed/${id}/?_expand=user&_expand=item`)
        .then(result => result.json())
        .then(setPersonals)
    }

    const getLocationActivities = (id) => {
        return fetch(`http://localhost:8088/feed/${id}/?_expand=user&_expand=location`)
        .then(result => result.json())
        .then(setActivities)
    }

    const addFeed = Feed => {
        return fetch("http://localhost:8088/feed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Feed)
        })
    }

    const getFeedById = (id) => {
        return fetch(`http://localhost:8088/feed/${id}`)
        .then(result => result.json())
    }

    const deleteFeed = FeedId => {
        return fetch(`http://localhost:8088/feed/${FeedId}`, {
            method: "DELETE"
        })
    }

    const updateFeed = Feed => {
        return fetch(`http://localhost:8088/feed/${Feed.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Feed)
        })
    }

    return (
        <FeedContext.Provider value={{
            getCurrentUserActivities, Personals, Activities, getActivities, addFeed, getFeedById, deleteFeed, updateFeed, setSearchTerms, searchTerms, getItemActivities, getLocationActivities
        }}>
            {props.children}
        </FeedContext.Provider>
    )
}