/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import {useParams} from 'react-router-dom'
import { UserContext } from './UserProvider'
import { Header, } from 'semantic-ui-react'

export const ConnectedUserDetail = () => {
    const {getUser, getUserById } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true);
    const {userId} = useParams();
    const [user, setUser] = useState([])
    const currentUser = localStorage.getItem("user")

    useEffect(() => {
        getUserById(userId).then(user => {
            setUser(user)
            setIsLoading(false)
        })
    }, [])


    return (
        <>
            <Header as='h2'>{`${user.firstName} ${user.lastName}`}</Header>
        </>

    )
}