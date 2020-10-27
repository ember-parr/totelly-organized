/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { UserContext } from '../user/UserProvider'
import { Header, Table} from 'semantic-ui-react'
import { LocationContext } from '../locations/LocationProvider'
import { LocationTableRow } from '../locations/LocationTableRow'

export const ConnectedUserDetail = () => {
    const {getUser, getUserById } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true);
    const {userId} = useParams();
    const history = useHistory()
    const [user, setUser] = useState([])
    const [location, setLocation] = useState([])
    const currentUser = localStorage.getItem("user")
    const { Locations, getLocations, addLocation } = useContext(LocationContext)
    const usersLocations = Locations.filter(loc => loc.userId === parseInt(userId))
    console.log("all locations: ", Locations)

   

    useEffect(() => {
        getUserById(userId).then(user => {
            setUser(user)
            setIsLoading(false)
            console.log("This page's user id: ", userId)
        }).then(getLocations).then(() => {
            console.log("users locations: ", usersLocations)
        })
    }, [])


    return (
        <>
            <Header as='h2'>{`${user.firstName} ${user.lastName}`}</Header>


            <Header as='h4'>{`${user.firstName}'s Locations:`}</Header>

            <Table celled selectable collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Location Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Shared With:</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                <Table.Body>
                    {usersLocations?.map(location => {
                            return (
                                <>
                                    <Table.Row onClick ={()=> history.push(`/locations/edit/${location.id}`)}>
                                        <Table.Cell>{ location.name }</Table.Cell>
                                        <Table.Cell>{ location.description }</Table.Cell>
                                        <Table.Cell>Shared With:</Table.Cell>
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