/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect } from 'react'
import { Icon, Grid, Card } from 'semantic-ui-react'
import { ActivityContext } from './ActivityProvider'

export const RecentlyAdded = () => {
    const {UserActivities, getCurrentUserActivities } = useContext(ActivityContext)
    const currentUser = parseInt(localStorage.user)

    const userItemActivities = UserActivities.filter(act => act.userId === currentUser && act.itemId !== 1)

    useEffect(()=> {

        getCurrentUserActivities(currentUser)
        
    }, [])


    
    console.log("item deails: ", userItemActivities)
    return (
        <>
        <Grid celled='internally' columns={3}>
            <Card.Group className="spaceBetween">
                {userItemActivities.slice(0,6).map((item) => (
                        <Card key={item.id} className="recentActivityCard">
                            <Card.Content>
                            <Card.Header >
                                <Icon name="plus circle" />
                                <a  href={`/items/edit/${item.item.id}`} alt="items">You added {item.item.itemName} </a>
                            </Card.Header>
                            <Card.Description>
                                {item.date} 
                            </Card.Description>
                            </Card.Content>









                        
                        
                    </Card>
                    ))}
</Card.Group>
                </Grid>
            
        </>
    )
}


