/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import {ItemContext} from './ItemProvider'
import { ItemTableRow } from './ItemTableRow'
import { useHistory } from 'react-router-dom'
import { Table, Button, Input } from "semantic-ui-react"
import {LocationContext} from '../locations/LocationProvider'


export const ItemTable = () => {
    const {Items, getUsersItems, getItems,setSearchTerms, searchTerms } = useContext(ItemContext)
    const { getLocationsSharedWithUser } = useContext(LocationContext)
    const user = parseInt(localStorage.user)
    const [filteredItems, setFiltered] = useState([])
    const domHistory = useHistory()
    const [thisUsersItems, setThisUsersItems] = useState([])


    const [sharedLocations, setSharedLocations] = useState([])
    const sharedLocationIds = sharedLocations.map((location) => location.locationId)
    const itemsSharedWithThisUser = Items.filter(item => sharedLocationIds.includes(item.location.id))
    const combinedItems = itemsSharedWithThisUser.concat(thisUsersItems)
    

    
    useEffect(()=> {
        getUsersItems(user)
        .then((items) => {
            setThisUsersItems(items)
        })
        .then(() => {
            setFiltered(thisUsersItems)
        })
    }, [])

    useEffect(() => {
        getItems()
        getLocationsSharedWithUser(user)
        .then(shared => {
            setSharedLocations(shared)
        })

    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = combinedItems.filter(item => item.itemName.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(thisUsersItems)
        }
    }, [searchTerms, Items])


    
    
    let myItemClicked = () => {
        setFiltered(thisUsersItems)
    }
    
    let sharedItemsClicked = () => {
        setFiltered(itemsSharedWithThisUser)
    }
    
    let handleClick = () => {
        setFiltered(combinedItems)
        
    }




    return (
        
        <>
        <Button color='teal' onClick={() => domHistory.push("/items/add")}>New Item</Button>

        <Input
        type="text"
        icon='search'
        onKeyUp={(keyEvent) => setSearchTerms(keyEvent.target.value.toLowerCase())}
        placeholder="Search Items... "
        />



        <Button.Group  floated='right'>
            <Button toggle onClick={myItemClicked}>View Only My Items</Button>
                <Button.Or />
            <Button toggle onClick={sharedItemsClicked}>Items Shared With me</Button>
                <Button.Or />
            <Button toggle onClick={handleClick}>View All Items</Button>
        </Button.Group>
        
        <Table unstackable celled selectable collapsing compact size="small" className="pageComponent">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={1}>Item Name</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Location</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Owner</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Room</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Placement</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Category</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Details</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

        
            <Table.Body>
            {filteredItems.map(item => {
                    return <ItemTableRow key={item.id} item={item} />
                })}

            </Table.Body>
        </Table>
        
        
        
        
        

        </>
    )
}