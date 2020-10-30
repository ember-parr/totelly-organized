import React, {useContext, useEffect, useState} from 'react'
import { Segment, Dropdown, Button  } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';
import {ConnectionContext} from '../connectedUsers/ConnectionProvider'
import {LocationContext} from './LocationProvider'
let dateFormat = require('dateformat')
let now = new Date()
let currentDate = dateFormat(now, "longDate")

export const ShareLocationSegment = () => {
    const {connections, getConnection} = useContext(ConnectionContext)
    const {shareLocationWithUser} = useContext(LocationContext)
    const currentUser = localStorage.getItem("user")
    const [thing, setThing] = useState({})
    const locationId = useParams()
    const usersConnectedUsers = connections.filter(cons => cons.connectedUserId === parseInt(currentUser))
    // let currentLocation = location.id

    useEffect(() => {
        getConnection()
        
        
    })

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
    }

    return (
        <>
            <Segment raised>
                <p>
                    To share <strong> {'this location'} </strong> with another user, please select user from dropdown below
                </p>
            
                <Dropdown 
                    placeholder='Choose from your connected users'
                    options={usersConnectedUsers.map(connection => (
                        {
                            key: connection.userId,
                            text: connection.user.firstName +" " + connection.user.lastName,
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
                }}> Share Location </Button>
            
            
            </Segment>
        </>
    )

}