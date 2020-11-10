/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react'
import { Segment, Dropdown, Button  } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';
import {ConnectionContext} from '../connectedUsers/ConnectionProvider'
import {LocationContext} from './LocationProvider'
import Notifications, {notify} from 'react-notify-toast';
let dateFormat = require('dateformat')
let now = new Date()
let currentDate = dateFormat(now, "longDate")

export const ShareLocationSegment = () => {
    const {connections, getConnection} = useContext(ConnectionContext)
    const {shareLocationWithUser, getSharedLocation, getLocations, Locations} = useContext(LocationContext)
    const currentUser = localStorage.getItem("user")
    const [thing, setThing] = useState({})
    const [sharedWith, setSharedWith] = useState([])
    const [requestClicked, setRequestClicked] = useState(false)
    const userIdsWithAccess = sharedWith.map((share) => share.userId)
    const locationId = useParams()
    const fixedLocationId = parseInt(locationId.locationId)
    const connectedUsers = connections.filter(connection => connection.connectedUserId === parseInt(currentUser) && connection.status === true && userIdsWithAccess.includes(connection.userId) === false)

    useEffect(()=> {
        getConnection()
    }, [requestClicked])

    useEffect(()=> {
        getSharedLocation(fixedLocationId)
        .then(location => { setSharedWith(location) })
        
    }, [requestClicked])




    const handleDropdown = (event, data) => {
        const newThing = { ...thing }
        newThing[data.name] = data.value
        setThing(newThing)
    }

    const createSharedLocation = () => {
        shareLocationWithUser({
            userId: thing.userId,
            locationId: parseInt(locationId.locationId),
            date: currentDate
        })
        if (requestClicked === false) {

            setRequestClicked(true)
        } else {
            setRequestClicked(false)
        }
    }

    let myColor = { background: '#2b7a78', text: "#FFFFFF" };

    return (
        <>
        <div className="pageComponent">
            <Segment raised>
                <p>
                    To share <strong> {'this location'} </strong> with another user, please select user from dropdown below
                </p>
            
                <Dropdown 
                    placeholder='Choose from your connected users'
                    options={connectedUsers.map(connection => (
                        {
                            key: connection.userId,
                            text: connection.user?.firstName +" " + connection.user?.lastName,
                            value: connection.userId
                        }
                    ))}
                    onChange={handleDropdown}
                    name="userId"
                    label="connections"
                    selection
                    search
                    />
            
            <Button 
                compact 
                style={{backgroundColor: 'grey', width: '200px', margin: "0px 30px"}}
                onClick={event => {
                    event.preventDefault()
                    createSharedLocation()
                    notify.show('Location Shared!', "custom", 4000, myColor)
                }}> Share Location </Button>
            <Notifications />
            
            </Segment>
            </div>
        </>
    )

}