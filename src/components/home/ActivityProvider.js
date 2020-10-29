import React, { useState, createContext } from "react"

export const ActivityContext = createContext()

export const ActivityProvider = (props) => {
    const [Activities, setActivities] = useState([])
    const [UserActivities, setUserActivities] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const currentUser = parseInt(localStorage.user)

    const getActivities = () => {
        return fetch(`http://localhost:8088/activity?_sort=date&_order=desc&_limit=20&_expand=item&_expand=location&_expand=user`)
        .then(result => result.json())
        .then(setActivities)
    }

    const getCurrentUserActivities = () => {
        return fetch(`http://localhost:8088/activity?userId=${currentUser}&_sort=date&_order=desc&_limit=5`)
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

    

    return (
        <ActivityContext.Provider value={{
            getCurrentUserActivities, UserActivities, Activities, getActivities, setSearchTerms, searchTerms, getItemActivities, getLocationActivities
        }}>
            {props.children}
        </ActivityContext.Provider>
    )
}