import React from 'react'
import { Message, Icon, Card, Image, Button } from 'semantic-ui-react'
import Avitar from "../../images/MichaelScott.png"



export const MyAccountPlaceholder = () => {
    return (
        <>
        <Message icon style={{width: "775px"}}>
            <Icon name='circle notched' loading />
            <Message.Content>
            <Message.Header>Coming In Version 2</Message.Header>
            User will be able to view a condensed view of their locations/items/lists, possibly add an avitar <br />
            We shall see!
            </Message.Content>
        </Message>


            <Card style={{width: "400px"}}>
                <Image src={Avitar} alt="profile image" fluid/>
                <Card.Content>
                    <Card.Header>Michael Scott</Card.Header>
                    <Card.Meta>joined in 2017</Card.Meta>
                    <Card.Description>That's What She Said</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button primary>Edit Profile</Button>
                    <Button disabled='true'>Delete Totelly Account</Button>
                </Card.Content>

            </Card>
        
  </>
    )
}