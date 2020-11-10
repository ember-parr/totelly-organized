import React, { useState, createContext } from "react"
export const LocationContext = createContext()



export const LocationProvider = (props) => {
    const [Locations, setLocations] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    // gets all locations from database
    const getLocations = () => {
        return fetch(`http://localhost:8088/locations?_expand=user`)
        .then(result => result.json())
        .then(setLocations)
    }

    // adds a new location to the database
    const addLocation = Location => {
        return fetch("http://localhost:8088/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Location)
        })
    }

    // finds a particular piece of sharedLocation in database.
    const getSharedLocation = (locationId) => {
        return fetch (`http://localhost:8088/sharedLocations?locationId=${locationId}&_expand=user`)
        .then(result => result.json())
    }

    // gets all locations shared with a particular user
    const getLocationsSharedWithUser = (userId) => {
        return fetch(`http://localhost:8088/sharedLocations?userId=${userId}`)
        .then(result => result.json())
    }

    // get a single location that matches the id provided. 
    const getLocationById = (id) => {
        return fetch(`http://localhost:8088/locations/${id}?_expand=user`)
        .then(result => result.json())
    }

    // when a user deletes a location, it is removed from the database
    const deleteLocation = LocationId => {
        return fetch(`http://localhost:8088/locations/${LocationId}`, {
            method: "DELETE"
        })
    }

    // when user deny's request to share location, the sharedLocation is deleted from database. 
    const deleteSharedLocation = locationId => {
        return fetch(`http://localhost:8088/sharedLocations/${locationId}`, {
            method: 'DELETE'
        })
    }

    // gets a list of all sharedLocations with a date set to 'REQUESTED'
    const getShareRequests = () => {
        return fetch(`http://localhost:8088/sharedLocations?date=REQUESTED&_expand=user&_expand=location`)
        .then(result => result.json())
        
    }

    // share a location with a user. if owner of location shares, date is added. if another user requests acces, date is set as 'REQUESTED'
    const shareLocationWithUser = (Location) => {
        return fetch ("http://localhost:8088/sharedLocations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Location)
        })
    }

    // when a user updates a location, changes are made in database. 
    const updateLocation = Location => {
        return fetch(`http://localhost:8088/locations/${Location.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Location)
        })
    }

    // when request approved, the sharedLocation is updated to include date. 
    const updateSharedLocation = Location => {
        return fetch(`http://localhost:8088/sharedLocations/${Location.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Location)
        })
    }

    return (
        <LocationContext.Provider value={{
            Locations, 
            getLocations, 
            addLocation, 
            getLocationById, 
            deleteLocation, 
            updateLocation, 
            setSearchTerms, 
            searchTerms,  
            getSharedLocation, 
            shareLocationWithUser,
            getLocationsSharedWithUser,
            getShareRequests,
            updateSharedLocation,
            deleteSharedLocation
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}