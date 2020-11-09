/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useContext, useEffect } from 'react'
import { Grid, Card } from 'semantic-ui-react'
import { ActivityContext } from './ActivityProvider'
import { ConnectionContext } from "../connectedUsers/ConnectionProvider";

export const ActivityCard = () => {
    const {Activities, getActivities } = useContext(ActivityContext)
    const currentUser = parseInt(localStorage.user)
    const { connections, getConnection } = useContext(ConnectionContext);
    const connectedUsers = connections.filter(connection => connection.userId === currentUser)
    const connectedUsersIdList = connectedUsers.map(connection => connection.connectedUserId)

    useEffect(()=> {
        getActivities().then(getConnection)
    }, [])

    console.log("connected user ids: ", connectedUsersIdList)
    console.log("activities: ", Activities)

    return (
        <>
            <Grid  celled='internally' columns={8}  >
                <Card.Group className="spaceBetween">
                    {Activities.map((activity) => {
                        if (connectedUsersIdList.includes(activity.userId) && activity.itemId !== 1 && activity.locationId === 1 && activity.connectedUserId === 1) {
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
                                    {activity.activityType}: {activity?.item?.itemName} 
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