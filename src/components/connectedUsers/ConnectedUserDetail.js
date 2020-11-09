/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import Notifications, {notify} from 'react-notify-toast';
import {useParams, useHistory} from 'react-router-dom'
import { UserContext } from '../user/UserProvider'
import { Header, Table, Button, Label} from 'semantic-ui-react'
import { LocationContext } from '../locations/LocationProvider'

export const ConnectedUserDetail = () => {
    const {getUserById } = useContext(UserContext)
    const {userId} = useParams();
    const history = useHistory()
    const [user, setUser] = useState([])
    const { Locations, getLocations, getLocationsSharedWithUser, shareLocationWithUser } = useContext(LocationContext)
    const usersLocations = Locations.filter(loc => loc.userId === parseInt(userId))
    const [sharedLocations, setSharedLocations] = useState([])
    const currentUser = parseInt(localStorage.user)
    const sharedLocationIds = sharedLocations.map((location) => location.locationId)
    const requestedLocations = sharedLocations.filter(location => location.date === 'REQUESTED')
    const requestedLocationIds = requestedLocations.map((location) => location.locationId)
    

    useEffect(() => {
        getUserById(userId).then(user => {
            setUser(user)
        })
    }, [])

    useEffect(()=> {
        getLocations()
        getLocationsSharedWithUser(currentUser)
        .then(shared => {
            setSharedLocations(shared)
        })
    }, [Locations])


    const locationRequest = (location) => {
        shareLocationWithUser({
            userId: currentUser,
            locationId: location.id,
            date:"REQUESTED"
        })
        sharedLocations.concat(location)
        
    }



    const locationActionBtn = (location) => {

        
        if (requestedLocationIds.includes(location.id)) {
            return <Label tag>Request Pending</Label>
        } else if (sharedLocationIds.includes(location.id)) {
            return <Button size='tiny' onClick ={()=> history.push(`/locations/edit/${location.id}`)}> View Details </Button>
        } else if ( sharedLocationIds.includes(location.id) === false) {
            return <Button 
                    onClick={(e) => {
                        
                        locationRequest(location)
                        notify.show('Request Sent!', "custom", 5000, myColor)
                    }}
                    color='grey' size='tiny' type="submit"> Request Access </Button>
        } else {
            return ("uh-oh something broke")
        }
    }


    let myColor = { background: '#2b7a78', text: "#FFFFFF" };

    return (
        <>
            <Header as='h2'>{`${user.firstName} ${user.lastName}`}</Header>


            <Header as='h4'>{`${user.firstName}'s Locations:`}</Header>

            <Table celled compact size="small" className="pageComponent">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={4}>Location Name</Table.HeaderCell>
                        <Table.HeaderCell width={8}>Description</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Actions</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                <Table.Body>
                    {usersLocations?.map(location => {
                            return (
                                <>
                                    <Table.Row >
                                        <Table.Cell collapsing>{ location.name }</Table.Cell>
                                        <Table.Cell>{ location.description }</Table.Cell>
                                        <Table.Cell>{ locationActionBtn(location) }</Table.Cell>
                                    </Table.Row>
                                </>
                            )
                        })
                    }
                </Table.Body>
            </Table>
            <Notifications />
        </>

    )
}