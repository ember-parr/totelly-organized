import React from "react";
import { useHistory } from 'react-router-dom'
import { Card } from "semantic-ui-react";


export const UserCard = ({ friend, isFriend, status  }) => {
    const history = useHistory()
    const PhoneNumber = require('@reallyuseful/phonenumber')

    return (
        <>
    <Card  onClick ={()=> history.push(`/user/detail/${friend.id}`)} style={{margin: "0em 1em"}}>
        <Card.Content header={`${friend.firstName} ${friend.lastName}`} />
        <Card.Content>
            <Card.Meta>{status}</Card.Meta>
            Email: {friend.email} <br />
            Phone: {PhoneNumber.formatFriendly(`${friend.phoneNumber}`)} </Card.Content>
        </Card>
        
        <Card.Content extra style={{margin: "0em 1em 1em 1em"}} fluid>
            {isFriend}
        </Card.Content>
    
    </>
    )
};


