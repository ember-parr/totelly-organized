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
        <div class="pageComponent">
            <Button onClick={() => domHistory.push("/locations/add")}>New Location</Button>
            
            <Table celled selectable collapsing compact size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={3}>Location Name</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Owner</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Description</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Shared With:</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                <Table.Body>
                    {filteredLocations.map(location => {
                            return <LocationTableRow key={location.id} location={location} />
                        })
                    }
                </Table.Body>
            </Table>
        </div>
    )
}