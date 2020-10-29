/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useContext, useEffect } from 'react'
import { Grid, Card } from 'semantic-ui-react'
import { ActivityContext } from './ActivityProvider'

export const ActivityCard = () => {
    const {Activities, getActivities } = useContext(ActivityContext)
    

    useEffect(()=> {
        getActivities()
    }, [])

    return (
        <>
            <Grid  divided="internally" columns={4} relaxed>
                <Card.Group>
                    {Activities.map((activity) => (
                        <Card >
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
                    ))}
                    
                </Card.Group>
            </Grid>
        
        
            


        </>
            
    )




    
}