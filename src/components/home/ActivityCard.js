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

    // const activityInformation = Activities.map((activity) => {
    //     if (activity.activityType === "Added A New Item" && activity.userId !== currentUser) {
    //         getItemActivities(activity.id)
    //     } else if (activity.activityType === "Added A New Location" && activity.userId !== currentUser) {
    //         getLocationActivities(activity.id)
    //     }
    // })
    // setActivityDetails(activityInformation)
    


    useEffect(() => {
        const arrayOfActivities = []
        const activityInformation = Activities.map((activity) => {
                if (activity.itemId) {
                    getItemActivities(activity.id, 'item')
                    .then(arrayOfActivities.push(ItemActs))
                } 
                if (activity.locationId) {
                    getItemActivities(activity.id, 'location')
                    .then(arrayOfActivities.push(ItemActs))
                }
            })
            
        setActivityDetails(arrayOfActivities)
        console.log("activity info: ", activityInformation)
        console.log("array of activities: ", arrayOfActivities)
            
        }, [])
    

    return (
        
            <Feed size="small">
                {activityDetails.map((activity) => (
                    <Feed.Event >
                    <Feed.Label>
                            <Icon name="plus circle" />
                        </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary>
                        {activity?.user?.firstName} added {activity?.item?.itemName} {activity?.location?.itemName} 
                        </Feed.Summary>
                
                    </Feed.Content>
                </Feed.Event>
                ))}
                </Feed>
            
    )
    
}