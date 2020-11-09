/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react'
import { Icon, Grid, Card } from 'semantic-ui-react'
import {ItemContext} from "../items/ItemProvider"
import { ActivityContext } from './ActivityProvider'

export const RecentlyAdded = () => {
    const {UserActivities, getCurrentUserActivities} = useContext(ActivityContext)
    const { Items, getItems } = useContext(ItemContext)
    const currentUser = parseInt(localStorage.user)
    const [itemDetails, setItemDetails] = useState([])

    useEffect(()=> {
        getCurrentUserActivities().then(getItems())
    }, [])



    useEffect(() => {
        const activitiesByUser = UserActivities.filter(
            (activity) => activity.userId === currentUser
        );

        const itemsId = activitiesByUser.map((activity) => activity.itemId)

        const activityInfo = Items.filter(
            (item) => itemsId.includes(item.id) 
        );
            setItemDetails(activityInfo)

    }, [UserActivities, Items, currentUser])
    

    return (
        <>
        <Grid celled='internally' columns={3}>
            <Card.Group className="spaceBetween">
                {itemDetails.map((item) => (
                        <Card key={item.id} className="recentActivityCard">
                            <Card.Content>
                            <Card.Header >
                                <Icon name="plus circle" />
                                <a  href={`/items/edit/${item.id}`} alt="items">You added {item.itemName} </a>
                            </Card.Header>
                            <Card.Description>
                                Location: {item.location.name} <br />
                                Room: {item.room} <br />
                                Placement: {item.placement} <br />
                                </Card.Description>
                            </Card.Content>









                        
                        
                    </Card>
                    ))}
</Card.Group>
                </Grid>
            
        </>
    )
}


