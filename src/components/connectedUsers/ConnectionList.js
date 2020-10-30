/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from "react";
import { ConnectionContext } from "./ConnectionProvider";
import { UserContext } from "../user/UserProvider";
import { UserCard } from "./ConnectedUserCard";
import { Button, Segment, Grid, Card, Label } from 'semantic-ui-react';
import Notifications, {notify} from 'react-notify-toast';
let dateFormat = require('dateformat')
let now = new Date()
let currentDate = dateFormat(now, "longDate")


export const ConnectionList = () => {
    const {
        connections,
        getConnection,
        deleteConnection,
        addConnection,
        searchTerms
    } = useContext(ConnectionContext);
    const { Users, getUsers } = useContext(UserContext);
    const [filteredFriendUsers, setFriendUsers] = useState([])
    const [filteredNotFriendUsers, setNonFriendUsers] = useState([])
    const [pending, setPending] = useState([])
    
    
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

    let myColor = { background: '#2b7a78', text: "#FFFFFF" };

    //add two way friendship to database
    const addNewConnection = (id) => {
        const currentUser = parseInt(localStorage.user)
        console.log("adding user id: ", id)
        addConnection({userId: id, connectedUserId: currentUser, status: false, dateConnected: currentDate})
    }

    //get friends and users from database when searchTerms or friend status changes
    useEffect(() => {
        getConnection().then(getUsers);
    }, [])

    //get friends and users from database on page load
    useEffect(() => {
        const currentUser = parseInt(localStorage.user);
        //get the current users connections
        const friendsOfUser = connections.filter(
            (connection) => connection.userId === currentUser && connection.status === true
        );

        const currentUserSentRequest = connections.filter(
            (connection) => connection.connectedUserId === currentUser && connection.status === false
        )

        const opositeConnectionId = currentUserSentRequest.map((friend) => friend.userId)

        // get an array of the current users connected user id's 
        const connectionId = friendsOfUser.map((friend) => friend.connectedUserId)

        //get the user objects for the current users connected users
        const friendInformation = Users.filter(
            (user) => connectionId.includes(user.id) && user.id !== currentUser
        );

        // get the user objects of who the user is not friends with
        const nonFriendInformation = Users.filter(
            (user) => 
                connectionId.includes(user.id) === false && user.id !== currentUser
        );

        const pendingRequest = Users.filter(
            (user) => 
                opositeConnectionId.includes(user.id) && user.id !== currentUser
        )

        setPending(pendingRequest)

        if (searchTerms !== "") {
            //search through friends by email/name
            const friendSubset = friendInformation.filter(
                (friend) => 
                friend.email
                    .toLowerCase()
                    .includes(searchTerms.toLowerCase().trim()) || 
                friend.firstName
                    .toLowerCase()
                    .includes(searchTerms.toLowerCase().trim()) || 
                friend.lastName
                    .toLowerCase()
                    .includes(searchTerms.toLowerCase().trim())  || 
                friend.phoneNumber
                    .includes(searchTerms.toLowerCase().trim())
            );
            //search through nonFriends by email/name
            const nonFriendSubset = nonFriendInformation.filter(
                (friend) =>
                friend.email
                    .toLowerCase()
                    .includes(searchTerms.toLowerCase().trim()) ||
                friend.firstName
                    .toLowerCase()
                    .includes(searchTerms.toLowerCase().trim()) ||
                friend.lastName
                    .toLowerCase()
                    .includes(searchTerms.toLowerCase().trim()) ||
                friend.phoneNumber
                    .includes(searchTerms.toLowerCase().trim())
            );
            // if the search field is not blank, display matching friends/nonfriends
            setFriendUsers(friendSubset);
            
            setNonFriendUsers(nonFriendSubset);
            } else {
            // if the search field is blank, display all friends & non friends
            
            setNonFriendUsers()
            setFriendUsers(friendInformation);
            }
        }, [connections, Users, searchTerms])

    return (
        <>
            <Segment basic>
                <div>
                {/* map through friends */}
                <Grid.Row>
                    <Card.Group >
                    {filteredFriendUsers.map((user) => (
                    <Grid.Column key={user.id}>
                        <UserCard
                        status={'Connected'}
                        friend={user}
                        isFriend={
                            <Button
                            style={{"backgroundColor": "#2b7a78"}}
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                removeConnection(user.id);
                            }}
                            >
                            {" "}
                            Delete{" "}
                            </Button>
                        }
                        />
                    </Grid.Column>
                    ))}
                    </Card.Group>
                </Grid.Row>
                </div>
            </Segment>
        <Segment basic>
            
            {/* map through nonfriends */}
            <div className="friends">
            <Grid.Row>
            <Card.Group >
                {filteredNotFriendUsers?.map((user) => {
                    if (pending.includes(user)) {
                        return (
                            <Grid.Column key={user.id}>
                                
                                <UserCard
                                status={'Not Yet Connected'}
                                friend={user}
                                isFriend={
                                    <Label as='a' color='teal' tag>Request Pending</Label>
                                }
                                />
                                
                            </Grid.Column>
                        )
                    } else {
                        return (
                            <Grid.Column key={user.id}>
                                <UserCard
                                status={'Not Yet Connected'}
                                friend={user}
                                isFriend={
                                    <Button
                                    secondary
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addNewConnection(user.id);
                                        notify.show('Request Sent!', "custom", 5000, myColor)
                                    }}
                                    >
                                    {" "}
                                    Request{" "}
                                    </Button>
                                }
                                />
                                <Notifications />
                            </Grid.Column>
                        )
                    }
                
                })}
                </Card.Group>
            </Grid.Row>
            </div>
        </Segment>

        </>
    )
}