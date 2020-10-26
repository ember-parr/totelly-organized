/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import { UserCard } from './UserCard'
import { UserContext } from './UserProvider'


export const ListOfAllUsers = () => {
    const {Users, getUsers, searchTerms} = useContext(UserContext)

    const [filteredUsers, setFiltered] = useState([])
    const domHistory = useHistory()

    useEffect(()=> {
        getUsers()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = Users.filter(user => user.firstName.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(Users)
        }
    }, [searchTerms, Users])




    return (
        <List selection verticalAlign='middle'>
            {filteredUsers.map(user => {
                return <UserCard key={user.id} user={user} />
            })}
        </List>
    )
}