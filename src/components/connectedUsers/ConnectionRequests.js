/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from "react";
import { ConnectionContext } from "./ConnectionProvider";
import { UserContext } from "../user/UserProvider";
import { Button, Card } from 'semantic-ui-react';

export const ConnectionRequest = () => {
    const {
        connections,
        getConnection,
        deleteConnection,
        updateConnection,
        searchTerms
    } = useContext(ConnectionContext);
    const { Users, getUsers } = useContext(UserContext);
    const [filteredFriendUsers, setFriendUsers] = useState([])
    
    //delete two-way friendship from database
    const removeConnection = (UserToDelete) => {
        const currentUser = parseInt(localStorage.user)
        connections.map((connection) => {
            if (connection.userId === UserToDelete && connection.connectedUserId === currentUser) {
                console.log("deleteing user id: ", UserToDelete, "ConnectionId: ", connection.id)
                deleteConnection(connection.id)
            } else if (connection.connectedUserId === UserToDelete && connection.userId === currentUser) {
                console.log("deleteing connectedUser id: ", UserToDelete, "ConnectionId: ", connection.id)
                deleteConnection(connection.id)
            } else {
                console.log("nothing to delete?")
            }
        })
    }

    const approveConnection = (UserToapprove) => {
        const currentUser = parseInt(localStorage.user)
        connections.map((connection) => {
            if (connection.connectedUserId === UserToapprove && connection.userId === currentUser) {
                console.log("approveing connectedUser id: ", UserToapprove, "ConnectionId: ", connection.id)
                updateConnection({
                    id: connection.id,
                    userId: currentUser,
                    connectedUserId: UserToapprove,
                    status: true,
                    dateConnected: 1601409045668
                })
            } else if (connection.userId === UserToapprove && connection.connectedUserId === currentUser) {
                console.log("approveing connectedUser id: ", UserToapprove, "ConnectionId: ", connection.id)
                updateConnection({
                    id: connection.id,
                    userId: UserToapprove,
                    connectedUserId: currentUser,
                    status: true,
                    dateConnected: 1601409045668
                })
            } else {
                console.log("nothing to approve?")
            }
        })
    }

    //add two way friendship to database
    // const addConnection = (id) => {
    //     const currentUser = parseInt(localStorage.user)
    //     console.log("adding user id: ", id)
    //     updateConnection({userId: id, connectedUserId: currentUser, status: true, dateConnected: 1601409045668})
    //     updateConnection({userId: currentUser, connectedUserId: id, status: true, dateConnected: 1601409045668})
    // }

    //get friends and users from database when searchTerms or friend status changes
    useEffect(() => {
        getConnection().then(getUsers);
    }, [])

    //get friends and users from database on page load
    useEffect(() => {
        const currentUser = parseInt(localStorage.user);
        //get the current users connections
        const friendsOfUser = connections.filter(
            (connection) => connection.userId === currentUser && connection.status === false
        );

        // get an array of the current users connected user id's 
        const connectionId = friendsOfUser.map((friend) => friend.connectedUserId)

        //get the user objects for the current users connected users
        const friendInformation = Users.filter(
            (user) => connectionId.includes(user.id) && user.id !== currentUser
            );
        
            setFriendUsers(friendInformation)
            console.log("friend info: ", friendInformation)
        // get the user objects of who the user is not friends with
        

        // if (searchTerms !== "") {
        //     //search through friends by email/name
        //     const friendSubset = friendInformation.filter(
        //         (friend) => 
        //         friend.email
        //             .toLowerCase()
        //             .includes(searchTerms.toLowerCase().trim()) || 
        //         friend.firstName
        //             .toLowerCase()
        //             .includes(searchTerms.toLowerCase().trim()) || 
        //         friend.lastName
        //             .toLowerCase()
        //             .includes(searchTerms.toLowerCase().trim())
        //     );
            
            
        //     // if the search field is not blank, display matching friends/nonfriends
        //     setFriendUsers(friendSubset);
        //     } else {
        //     // if the search field is blank, display all friends & non friends
        //     setFriendUsers(friendInformation);
        //     }
        }, [connections, Users, searchTerms])

    return (
        <>
                {/* map through friends */}
                    {filteredFriendUsers.map((user) => {
                        return (
                            <>
                            <Card>
                                <Card.Content>
                                    <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                                    <Card.Meta>Requested To Connect</Card.Meta>
                                    <Card.Description>
                                        
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra key={user.id}>
                                    <div className='ui two buttons'>
                                    <Button key={user.firstName} user={user} basic color='green' onClick={(e) => {
                                            e.preventDefault();
                                            approveConnection(user.id);
                                        }}>
                                        Approve
                                    </Button>
                                    <Button key={user.id} user={user} basic color='red' onClick={(e) => {
                                            e.preventDefault();
                                            removeConnection(user.id);
                                        }}>
                                        Decline
                                    </Button>
                                    </div>
                                </Card.Content>
                            </Card>
                            </>
                        )
                    })}
        </>
    )
}