/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import {ItemContext} from './ItemProvider'
import { ItemTableRow } from './ItemTableRow'
import { useHistory } from 'react-router-dom'
import { Table, Button, Input } from "semantic-ui-react"
import {ConnectionContext} from '../connectedUsers/ConnectionProvider'


export const ItemTable = () => {
    const {Items, getUsersItems, getItems,setSearchTerms, searchTerms, getSelectItems } = useContext(ItemContext)
    const user = parseInt(localStorage.user)
    const [filteredItems, setFiltered] = useState([])
    const domHistory = useHistory()
    const { getConnectionByUser } = useContext(ConnectionContext)
    const [usersConnections, setConnections] = useState([])
    const connectedUsersId = usersConnections.map((user) => user.connectedUserId)
    const userIdsForSearch = connectedUsersId.concat(user)
    
    useEffect(()=> {
        getUsersItems(user)
        .then((items) => {
            setFiltered(items)
        })
    }, [])

    useEffect(() => {
        getItems()
        getConnectionByUser(user)
        .then(connections => {
            setConnections(connections)
        })

    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = Items.filter(item => item.itemName.toLowerCase().includes(searchTerms) && userIdsForSearch.includes(item.userId)) 
            setFiltered(subset)
        } else {
            getSelectItems().then((items) => {
                let connectionsItems = items.filter(
                    (item) => connectedUsersId.includes(item.userId) || item.userId === user
                )
                setFiltered(connectionsItems)
                console.log("my connections items: ", connectionsItems)
            })
        }
    }, [searchTerms, Items])


    
    
    let myItemClicked = () => {
        getUsersItems(user).then((items) => {
            setFiltered(items)
        })
    }
    
    let sharedItemsClicked = () => {
        getSelectItems().then((items) => {
            let connectionsItems = items.filter(
                (item) => connectedUsersId.includes(item.userId)
            )
            setFiltered(connectionsItems)
        })
    }
    
    let handleClick = () => {
        getSelectItems().then((items) => {
            let connectionsItems = items.filter(
                (item) => connectedUsersId.includes(item.userId) || item.userId === user
            )
            setFiltered(connectionsItems)
        })
        
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