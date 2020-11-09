/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useContext, useEffect } from 'react'
import { Grid, Card } from 'semantic-ui-react'
import { ActivityContext } from './ActivityProvider'

export const ActivityCard = () => {
    const {Activities, getActivities } = useContext(ActivityContext)
    const currentUser = localStorage.getItem("user")

    useEffect(()=> {
        getActivities()
    }, [])

    return (
        <>
            <Grid  celled='internally' columns={8}  >
                <Card.Group className="spaceBetween">
                    {Activities.map((activity) => {
                        if (activity.userId !== currentUser) {
                            return (
                                <>

                        <Card key={activity.id} className="recentActivityCard">
                            <Card.Content>
                                <Card.Header>
                                    {activity?.user?.firstName} {activity?.user?.lastName}
                                </Card.Header>
                                <Card.Meta>
                                    {activity.date}
                                </Card.Meta>
                                <Card.Description>
                                    {activity.activityType}: {activity?.item?.itemName} {activity?.location?.name} {activity.connectedUserId !== 0 ? "a new user" : ""} 
                                </Card.Description>
                        </Card.Content>
                    </Card>
                                </>
                            )
                        }
                    })}

                </Card.Group>
            </Grid>
        </>
            
    )




    
}