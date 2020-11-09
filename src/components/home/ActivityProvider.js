import React, { useState, createContext } from "react"

export const ActivityContext = createContext()

export const ActivityProvider = (props) => {
    const [Activities, setActivities] = useState([])
    const [UserActivities, setUserActivities] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    // const currentUser = parseInt(localStorage.user)

    const getActivities = () => {
        return fetch(`http://localhost:8088/activity?_sort=date&_order=asc&_limit=10&_expand=item&_expand=location&_expand=user`)
        .then(result => result.json())
        .then(setActivities)
    }

    const getCurrentUserActivities = (userId) => {
        return fetch(`http://localhost:8088/activity?_sort=id&_order=desc&_limit=6&_expand=item&userId=${userId}&locationId=1&connectedUserId=1`)
        .then(result => result.json())
        .then(setUserActivities)
    }

    const getItemActivities = (id) => {
        return fetch(`http://localhost:8088/activity/${id}/?_expand=user&_expand=item`)
        .then(result => result.json())
    }

    const getLocationActivities = (id) => {
        return fetch(`http://localhost:8088/activity/${id}?_expand=user&_expand=location`)
        .then(result => result.json())
    }

    const addActivity = activity => {
        return fetch("http://localhost:8088/activity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(activity)
        })
    }
    

    return (
        <ActivityContext.Provider value={{
            getCurrentUserActivities, addActivity, UserActivities, Activities, getActivities, setSearchTerms, searchTerms, getItemActivities, getLocationActivities
        }}>
            {props.children}
        </ActivityContext.Provider>
    )
}