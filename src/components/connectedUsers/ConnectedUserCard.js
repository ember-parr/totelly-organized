import React from "react";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";

export const UserCard = ({ friend, isFriend }) => (
    <Card>
        <Card.Content>
        <Card.Header>
            <h3 className="friend__username">
            <Link to={`/friends/detail/${friend.id}`}>{friend.firstName} {friend.lastName}</Link>
            </h3>
        </Card.Header>
        <Card.Meta>
            {friend.firstName} {friend.lastName}
        </Card.Meta>
        <Card.Meta>{friend.email}</Card.Meta>
        <Card.Meta>{friend.phoneNumber}</Card.Meta>
        <Card.Meta>{isFriend}</Card.Meta>
        </Card.Content>
    </Card>
);
