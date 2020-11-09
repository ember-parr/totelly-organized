/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import {LocationContext} from './LocationProvider'
import { LocationTableRow } from './LocationTableRow'
import { useHistory } from 'react-router-dom'
import { Table, Button, Input } from "semantic-ui-react"


export const LocationTable = () => {
    const {Locations, getLocations, setSearchTerms, searchTerms, getLocationsSharedWithUser } = useContext(LocationContext)
    const user = parseInt(localStorage.user)
    const [filteredLocations, setFiltered] = useState([])
    const [sharedLocations, setSharedLocations] = useState([])
    const domHistory = useHistory()
    const thisUsersLocations = Locations.filter(location => location.userId === user)
    const sharedLocationIds = sharedLocations.map((location) => location.locationId)
    const locationsSharedWithThisUser = Locations.filter(location => sharedLocationIds.includes(location.id))
    const combinedLocations = locationsSharedWithThisUser.concat(thisUsersLocations)

    

    useEffect(() => {
        getLocations()
        setFiltered(thisUsersLocations)
        getLocationsSharedWithUser(user)
        .then(shared => {
            setSharedLocations(shared)
        })

    }, [])


    useEffect(() => {
        if (searchTerms !== "") {
            const subset = combinedLocations.filter(loc => loc.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(thisUsersLocations)
        }
    }, [searchTerms, Locations])






    let myLocationClicked = () => {
        setFiltered(thisUsersLocations)
    }
    
    let sharedLocationsClicked = () => {
        setFiltered(locationsSharedWithThisUser)
    }
    
    let handleClick = () => {
        setFiltered(combinedLocations)
    }




    return (
        <div>
            <section className="sectionAboveHeader">
            <Button className="addNew-btn" onClick={() => domHistory.push("/locations/add")}>New Location</Button>
            
            <Input
            type="text"
            icon='search'
            onKeyUp={(keyEvent) => setSearchTerms(keyEvent.target.value.toLowerCase())}
            placeholder="Search Locations... "
            className="searchTable"
            />



            <Button.Group  floated='right'>
                <Button toggle className="filter-btn" onClick={myLocationClicked}>View Only My Locations</Button>
                    <Button.Or />
                <Button toggle className="filter-btn" onClick={sharedLocationsClicked}>Locations Shared With me</Button>
                    <Button.Or />
                <Button toggle className="filter-btn" onClick={handleClick}>View All Locations</Button>
            </Button.Group>

            </section>

            <Table celled selectable  compact className="pageComponent">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={3}>Location Name</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Owner</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Description</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Shared With:</Table.HeaderCell>
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