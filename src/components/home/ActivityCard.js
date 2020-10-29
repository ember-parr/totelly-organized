/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useContext, useEffect, useState} from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import { FeedContext } from './FeedProvider'

export const ActivityCard = () => {
    const {Activities, getActivities, getItemActivities, getLocationActivities, ItemActs, LocActs} = useContext(FeedContext)
    const currentUser = parseInt(localStorage.user)
    const [activityDetails, setActivityDetails] = useState([])
    

    useEffect(()=> {
        getActivities()
    }, [])

    return (
        
            <Feed size="small" fluid>
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