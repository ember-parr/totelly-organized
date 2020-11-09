/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { UserContext } from '../user/UserProvider'
import { Header, Table, Button} from 'semantic-ui-react'
import { LocationContext } from '../locations/LocationProvider'

export const ConnectedUserDetail = () => {
    const {getUserById } = useContext(UserContext)
    const {userId} = useParams();
    const history = useHistory()
    const [user, setUser] = useState([])
    const { Locations, getLocations, getLocationsSharedWithUser } = useContext(LocationContext)
    const usersLocations = Locations.filter(loc => loc.userId === parseInt(userId))
    const [sharedLocations, setSharedLocations] = useState([])
    const currentUser = parseInt(localStorage.user)
    const sharedLocationIds = sharedLocations.map((location) => location.locationId)
    

    useEffect(() => {
        getUserById(userId).then(user => {
            setUser(user)
        }).then(getLocations)
    }, [])

    useEffect(()=> {
        getLocationsSharedWithUser(currentUser)
        .then(shared => {
            setSharedLocations(shared)
        })
    }, [])

    const locationActionBtn = (location) => {

        if (sharedLocationIds.includes(location.id)) {
            return <Button size='tiny' onClick ={()=> history.push(`/locations/edit/${location.id}`)}> View Details </Button>
        } else if ( sharedLocationIds.includes(location.id) === false) {
            return <Button color='grey' size='tiny'> Request Access </Button>
        } else {
            return ("uh-oh something broke")
        }
    }


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
        </>

    )
}