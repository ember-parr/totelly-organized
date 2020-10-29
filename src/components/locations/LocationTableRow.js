/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from "react"
import { useHistory } from 'react-router-dom'
import { LocationContext } from './LocationProvider'
import { Table } from 'semantic-ui-react'

export const LocationTableRow = ({location}) => {
    const history = useHistory()
    const {getSharedLocation} = useContext(LocationContext)
    const [filteredLocations, setFilteredLocations] = useState([])

    useEffect(()=> {
        getSharedLocation(location.id).then(location => {
            setFilteredLocations(location)
            console.log("filteredLocations: ", filteredLocations, "location func scope: ", location)
        })
    }, [])

    // useEffect(() => {
    //     const sharedWith = SharedLocations.filter(
    //         (location) => location.locationId === location.id
            
    //     )
    //     setFilteredLocations(sharedWith)
    //     console.log("shared with: ", sharedWith)
    //     console.log("filtered locations: ", filteredLocations)
    // }, [])







    return (
        
        <>
            <Table.Row onClick ={()=> history.push(`/locations/edit/${location.id}`)}>
                <Table.Cell>{ location.name }</Table.Cell>
                <Table.Cell>{ location.user.firstName }</Table.Cell>
                <Table.Cell>{ location.description }</Table.Cell>
                <Table.Cell>
                    {filteredLocations.map((loc) => (
                        <span style={{ padding:10, marginHorizontal:10}}>{loc.user.firstName}</span>
                    ))}
                </Table.Cell>
            </Table.Row>
        </>
    )
}