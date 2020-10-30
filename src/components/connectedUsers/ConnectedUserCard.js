import React from "react";
import { useHistory } from 'react-router-dom'
import { Card } from "semantic-ui-react";


export const UserCard = ({ friend, isFriend, status  }) => {
    const history = useHistory()
    const PhoneNumber = require('@reallyuseful/phonenumber')

    if (status === 'Not Yet Connected') {
    return (
    <Card style={{margin: "0em 1em"}}>
        <Card.Content header={`${friend.firstName} ${friend.lastName}`} />
        <Card.Content>
        <Card.Meta>Request to connect with {friend.firstName} to use Totelly Organized together!</Card.Meta>
            
        </Card.Content>
        
        <Card.Content extra>
            {isFriend}
        </Card.Content>
    </Card>
    )
    } else if (status === 'Connected') {
        return (
            <Card  onClick ={()=> history.push(`/user/detail/${friend.id}`)} style={{margin: "0em 1em"}}>
                <Card.Content header={`${friend.firstName} ${friend.lastName}`} />
                <Card.Content>
                    <Card.Meta>{`You are connected, click HERE to view ${friend.firstName}'s Items`}</Card.Meta>
                    Email: {friend.email} <br />
                    Phone: {PhoneNumber.formatFriendly(`${friend.phoneNumber}`)} </Card.Content>
                
                <Card.Content extra>
                    {isFriend}
                </Card.Content>
            </Card>
            )
    }
};


