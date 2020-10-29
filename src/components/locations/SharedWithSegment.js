/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from "react"
import { LocationContext } from './LocationProvider'
import { Card } from 'semantic-ui-react'

export const SharedWithSegment = ({location}) => {
    const {getSharedLocation} = useContext(LocationContext)
    const [filteredLocations, setFilteredLocations] = useState([])

    useEffect(()=> {
        getSharedLocation(location.id).then(location => {
            setFilteredLocations(location)
        })
    }, [])

    return (
        <>
            <Card.Group>
                {filteredLocations.map((loc) => {
                    return (
                        <>
                        <Card>
                            <Card.Content>
                            <Card.Header>{loc.user.firstName} {loc.user.lastName}</Card.Header>
                                <Card.Meta>Co-Worker</Card.Meta>
                                <Card.Description>
                                Matthew is a pianist living in Nashville.
                                </Card.Description>
                            </Card.Content>
                            </Card>
                        </>
                    )
                })}
            </Card.Group>
        </>
    )
}