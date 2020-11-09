/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from "react"
import { LocationContext } from './LocationProvider'
import Notifications, {notify} from 'react-notify-toast';
import { Card, Button } from 'semantic-ui-react'

export const SharedWithSegment = ({location}) => {
    const {getSharedLocation, updateSharedLocation, deleteSharedLocation, getLocations, Locations} = useContext(LocationContext)
    const [filteredLocations, setFilteredLocations] = useState([])
    let dateFormat = require('dateformat')
    let now = new Date()
    let currentDate = dateFormat(now, "longDate")
    

    useEffect(()=> {
        getLocations()
        .then(() => {

            getSharedLocation(location.id).then(location => {
                setFilteredLocations(location)
            })
        })
    }, [Locations])
    

    let myColor = { background: '#2b7a78', text: "#FFFFFF" };
    let myRejectColor = { background: '#1e0001', text: "#FFFFFF" };


    const approveShare = (shareToApprove) => {
        updateSharedLocation({
            id: shareToApprove.id,
            userId: shareToApprove.userId,
            locationId: shareToApprove.locationId,
            date: currentDate
        })
    }

    const deleteRequest = (requestId) => {
        console.log("request id: ", requestId)
        deleteSharedLocation(requestId)
    }

    return (
        <>
            <Card.Group>
                {filteredLocations.map((loc) => {
                    if (loc.date === "REQUESTED") {
                        return (
                            <>
                            <Card>
                                <Card.Content>
                                <Card.Header>{loc.user.firstName} {loc.user.lastName}</Card.Header>
                                    <Card.Meta>Request Pending...</Card.Meta>
                                    <Button.Group fluid>
                                    <Button  user={loc.user?.firstName} className="approve-btn" onClick={(e) => {
                                            e.preventDefault();
                                            approveShare(loc);
                                            notify.show('Location Shared!', "custom", 5000, myColor)
                                        }}>
                                        Approve
                                    </Button>
                                    <Button.Or />
                                    <Button  user={loc.user?.firstName} className="deny-btn" onClick={(e) => {
                                            e.preventDefault();
                                            deleteRequest(loc.id);
                                            notify.show('Request Deleted!', "custom", 5000, myRejectColor)
                                        }}>
                                        Decline
                                    </Button>
                                </Button.Group>
                                </Card.Content>
                                </Card>
                                <Notifications />
                            </>
                        )
                    } else {
                        return (
                            <>
                            <Card>
                                <Card.Content>
                                <Card.Header>{loc.user.firstName} {loc.user.lastName}</Card.Header>
                                    <Card.Meta>{loc.user.email}</Card.Meta>
                        <Card.Description>Shared On: {loc.date}</Card.Description>
                                </Card.Content>
                                </Card>
                                <Notifications />
                            </>
                        )



                    }
                })}
            </Card.Group>
        </>
    )
}