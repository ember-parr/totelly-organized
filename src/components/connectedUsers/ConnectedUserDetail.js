/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { UserContext } from '../user/UserProvider'
import { Header, Table} from 'semantic-ui-react'
import { LocationContext } from '../locations/LocationProvider'

export const ConnectedUserDetail = () => {
    const {getUserById } = useContext(UserContext)
    const {userId} = useParams();
    const history = useHistory()
    const [user, setUser] = useState([])
    const { Locations, getLocations } = useContext(LocationContext)
    const usersLocations = Locations.filter(loc => loc.userId === parseInt(userId))



    useEffect(() => {
        getUserById(userId).then(user => {
            setUser(user)
        }).then(getLocations)
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