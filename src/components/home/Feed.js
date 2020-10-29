/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useContext, useEffect} from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import { FeedContext } from './FeedProvider'

export const DashboardFeed = () => {
    const {Activities, getActivities } = useContext(FeedContext)

    useEffect(()=> {
        getActivities()
    }, [])
    

    return (
    Activities.map((activity)=> {
        if (activity.activityType === "Added A New Location") {
            return (
                <Feed.Event key={activity.id}>
                    <Feed.Label>
                        <Icon name="map outline" />
                    </Feed.Label>
                <Feed.Content>
                    <Feed.Date>{activity.date}</Feed.Date>
                    <Feed.Summary>
                        a user {activity.activityType}
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
            )
        } else if (activity.activityType === "Connected With") {
            return (
                <Feed.Event key={activity.id}>
                    <Feed.Label>
                            <Icon name="user plus" />
                        </Feed.Label>
                    <Feed.Content>
                        <Feed.Date>{activity.date}</Feed.Date>
                        <Feed.Summary>
                            Someone {activity.activityType} Someone Else
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>
            )
        } else if (activity.activityType === "Added A New Item") {
            return (
                <Feed.Event key={activity.id}>
                <Feed.Label>
                        <Icon name="plus circle" />
                    </Feed.Label>
                <Feed.Content>
                    <Feed.Date>{activity.date}</Feed.Date>
                    <Feed.Summary>
                        Someone {activity.activityType}: {activity.dataTwo}
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
            )
        }
    })    
    )
}


/* <img src='#' alt="placeholder imgg"/> */