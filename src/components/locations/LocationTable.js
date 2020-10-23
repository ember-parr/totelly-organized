/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import {LocationContext} from './LocationProvider'
import { LocationTableRow } from './LocationTableRow'
import { useHistory } from 'react-router-dom'
import { Table, Button } from "semantic-ui-react"


export const LocationTable = () => {
    const {Locations, getLocations, searchTerms } = useContext(LocationContext)

    const [filteredLocations, setFiltered] = useState([])
    const domHistory = useHistory()

    useEffect(()=> {
        getLocations()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = Locations.filter(loc => loc.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(Locations)
        }
    }, [searchTerms, Locations])

    return (
        <>
            <Button onClick={() => domHistory.push("/locations/add")}>New Location</Button>
            
            <Table celled selectable collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Location Name</Table.HeaderCell>
                        <Table.HeaderCell>Owner</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Shared With:</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                <Table.Body>
                    {filteredLocations.map(location => {
                            return <LocationTableRow key={location.id} location={location} />
                        })
                    }
                </Table.Body>
            </Table>
        </>
    )
}