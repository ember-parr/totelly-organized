import React, {useContext, useEffect, useState} from 'react'
import { Segment, Dropdown, Button  } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';
import {ConnectionContext} from '../connectedUsers/ConnectionProvider'
import {LocationContext} from './LocationProvider'

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
        console.log("dropdown selection: ", thing)
        newThing[data.name] = data.value
        setThing(newThing)
        console.log("data.value: ", data.value)
    }

    const createSharedLocation = () => {
        console.log("thing: ", thing.userId)
        shareLocationWithUser({
            userId: thing.userId,
            locationId: parseInt(locationId.locationId)
        })
    }

    return (
        <>
            <Segment raised>
                <p>
                    To share <strong>* LOCATION NAME * </strong> with another user, please select user from dropdown below
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