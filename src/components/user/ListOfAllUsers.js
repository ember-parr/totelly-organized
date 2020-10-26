/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { List, Header, Search } from 'semantic-ui-react'
import { UserCard } from './UserCard'
import { UserContext } from './UserProvider'


export const ListOfAllUsers = () => {
    const {Users, getUsers, searchTerms} = useContext(UserContext)

    const [filteredUsers, setFiltered] = useState([])

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
        <>
        <Header as='h2'>Add New User</Header>
        <Search fluid placeholder="Search by name, email or phone number" style={{ width: '200px'}}/>


        <Header as='h2'>All Users:</Header>
        <List selection verticalAlign='middle'>
            {filteredUsers.map(user => {
                return <UserCard key={user.id} user={user} />
            })}
        </List>
        </>
    )
}