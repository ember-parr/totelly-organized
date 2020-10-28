import React from "react";
import { useHistory } from 'react-router-dom'
import { Card } from "semantic-ui-react";


export const UserCard = ({ friend, isFriend, status  }) => {
    const history = useHistory()
    const PhoneNumber = require('@reallyuseful/phonenumber')

    return (
    <Card onClick ={()=> history.push(`/user/detail/${friend.id}`)}>
        <Card.Content header={`${friend.firstName} ${friend.lastName}`} />
        <Card.Content>
            <Card.Meta>{status}</Card.Meta>
            Email: {friend.email} <br />
            Phone: {PhoneNumber.formatFriendly(`${friend.phoneNumber}`)} </Card.Content>
        
        <Card.Content extra>
            {isFriend}
        </Card.Content>
    </Card>
    )
};


