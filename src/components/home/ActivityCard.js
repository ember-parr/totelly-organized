/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useContext, useEffect } from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import { FeedContext } from './FeedProvider'

export const ActivityCard = () => {
    const {Activities, getActivities } = useContext(FeedContext)
    

    useEffect(()=> {
        getActivities()
    }, [])

    return (
        
            <Feed size="small">
                {Activities.map((activity) => (
                    <Feed.Event >
                    <Feed.Label>
                            <Icon name="plus circle" />
                        </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary>
                        <Feed.User>{activity?.user?.firstName} {activity?.user?.lastName}</Feed.User> added {activity?.item?.itemName} {activity?.location?.name} 
                        </Feed.Summary>
                
                    </Feed.Content>
                </Feed.Event>
                ))}
                </Feed>
            
    )
    
}