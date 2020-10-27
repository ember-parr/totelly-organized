/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from "react";
import { ConnectionContext } from "./ConnectionProvider";
import { UserContext } from "../user/UserProvider";
import { UserCard } from "./ConnectedUserCard";
import { Button, Segment, Grid } from 'semantic-ui-react';

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
    
    //delete two-way friendship from database
    const removeConnection = (UserToDelete) => {
        const currentUser = parseInt(localStorage.user)
        connections.map((connection) => {
            if (connection.userId === UserToDelete && connection.connectedUserId === currentUser) {
                console.log("deleteing user id: ", UserToDelete, "ConnectionId: ", connection.id)
                debugger;
                deleteConnection(connection.id)
            } else if (connection.connectedUserId === UserToDelete && connection.userId === currentUser) {
                console.log("deleteing connectedUser id: ", UserToDelete, "ConnectionId: ", connection.id)
                deleteConnection(connection.id)
            } else {
                console.log("nothing to delete?")
            }
        })
    }

    //add two way friendship to database
    const addNewConnection = (id) => {
        const currentUser = parseInt(localStorage.user)
        console.log("adding user id: ", id)
        addConnection({userId: id, connectedUserId: currentUser, status: false, dateConnected: 1601409045668})
        addConnection({userId: currentUser, connectedUserId: id, status: false, dateConnected: 1601409045668})
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
            (connection) => connection.userId === currentUser
        );

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
                    .includes(searchTerms.toLowerCase().trim())
            );
            // if the search field is not blank, display matching friends/nonfriends
            setFriendUsers(friendSubset);
            setNonFriendUsers(nonFriendSubset);
            } else {
            // if the search field is blank, display all friends & non friends
            setFriendUsers(friendInformation);
            setNonFriendUsers(nonFriendInformation)
            }
        }, [connections, Users, searchTerms])

    return (
        <>
            <Segment>
                <div>
                {/* map through friends */}
                <Grid.Row>
                    {filteredFriendUsers.map((user) => (
                    <Grid.Column key={user.id}>
                        <UserCard
                        friend={user}
                        isFriend={
                            <Button
                            
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
                </Grid.Row>
                </div>
            </Segment>
        <Segment>
            <h2 className="text-center">Connect With Other Users</h2>
            {/* map through nonfriends */}
            <div className="friends">
                <p>*** REMOVE THIS LIST FROM VIEW AFTER DATA DELETION PROBLEM SOLVED ***</p>
            <Grid.Row>
                {filteredNotFriendUsers.map((user) => (
                <Grid.Column key={user.id}>
                    <UserCard
                    friend={user}
                    isFriend={
                        <Button
                        
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            addNewConnection(user.id);
                        }}
                        >
                        {" "}
                        Request{" "}
                        </Button>
                    }
                    />
                </Grid.Column>
                ))}
            </Grid.Row>
            </div>
        </Segment>

        </>
    )
}