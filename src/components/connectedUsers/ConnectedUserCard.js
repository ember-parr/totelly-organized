import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
import { ConnectionContext } from "./ConnectionProvider";


export const UserCard = ({ friend, isFriend, status  }) => {

    const PhoneNumber = require('@reallyuseful/phonenumber')

    return (
    <Card>
        



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


