import React, {useContext, useEffect, useState} from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import {ItemContext} from "../items/ItemProvider"
import { FeedContext } from './FeedProvider'

export const RecentlyAdded = () => {
    const {Activities, getActivities} = useContext(FeedContext)
    const { Items, getItems } = useContext(ItemContext)
    const currentUser = parseInt(localStorage.user)
    const [itemDetails, setItemDetails] = useState([])

    useEffect(()=> {
        getActivities().then(getItems())
    }, [])



    useEffect(() => {
        const activitiesByUser = Activities.filter(
            (activity) => activity.userId === currentUser
        );

        const itemsId = activitiesByUser.map((activity) => activity.itemId)

        const activityInfo = Items.filter(
            (item) => itemsId.includes(item.id) 
        );
            setItemDetails(activityInfo)

    }, [Activities, Items, currentUser])
    

    return (
            <Feed size="small">
                {itemDetails.map((item) => (
                    <Feed.Event>
                    <Feed.Label>
                            <Icon name="plus circle" />
                        </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary>
                        <a href={`/items/edit/${item.id}`} alt="items">You added {item.itemName} </a>
                        </Feed.Summary>
                <Feed.Date> Location: {item.location.name}</Feed.Date>
                <Feed.Date>Room: {item.room}</Feed.Date>
                <Feed.Date>Placement: {item.placement}</Feed.Date>
                    </Feed.Content>
                </Feed.Event>
                ))}
                </Feed>
            
        
    )
}


/* <img src='#' alt="placeholder imgg"/> */