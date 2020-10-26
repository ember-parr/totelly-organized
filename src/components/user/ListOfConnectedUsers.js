/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { List, Header, Search } from 'semantic-ui-react'
import { UserCard } from './UserCard'
import { UserContext } from './UserProvider'


export const ListOfConnectedUsers = () => {
    const {ConnectedUsers, getUserConnections, searchTerms} = useContext(UserContext)

    const [filteredUsers, setFiltered] = useState([])
    const domHistory = useHistory()
    const currentUser = parseInt(localStorage.getItem("user"))

    useEffect(()=> {
        getUserConnections()
    }, [])

    useEffect(() => {
        if (currentUser !== 0) {
            console.log("current user: ", currentUser)
            const subset = ConnectedUsers.filter(connection => connection.connectedUserId === currentUser)
            setFiltered(subset)
        } else {
            setFiltered(ConnectedUsers)
        }
    }, [searchTerms, ConnectedUsers])




    return (
        <>


        <Header as='h2'>Connected Users</Header>
        <List selection verticalAlign='middle'>
            {filteredUsers.map(connection => {
                return <UserCard key={connection.id} connection={connection} />
            })}
        </List>
        </>
    )
}