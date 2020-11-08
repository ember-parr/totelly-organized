/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import {ItemContext} from './ItemProvider'
import { ItemTableRow } from './ItemTableRow'
import { useHistory } from 'react-router-dom'
import { Table, Button } from "semantic-ui-react"
import {ConnectionContext} from '../connectedUsers/ConnectionProvider'


export const ItemTable = () => {
    const {Items, getUsersItems, getItems, searchTerms, getSelectItems } = useContext(ItemContext)
    const user = parseInt(localStorage.user)
    const [filteredItems, setFiltered] = useState([])
    const domHistory = useHistory()
    const { getConnectionByUser } = useContext(ConnectionContext)
    const [usersConnections, setConnections] = useState([])
    const [connectionItems, setConnectionItems] = useState([])
    


    useEffect(()=> {
        getUsersItems(user)
        .then((items) => {
            setFiltered(items)
        })
    }, [])

    useEffect(() => {
        getConnectionByUser(user)
        .then(connections => {
            setConnections(connections)
        })

    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = Items.filter(item => item.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(Items)
        }
    }, [searchTerms, Items])


    
    let myItemClicked = () => {
        getUsersItems(user).then((items) => {
            setFiltered(items)
        })
    }
    
    let sharedItemsClicked = () => {
        const connectedUsersId = usersConnections.map((user) => user.connectedUserId)
        console.log("connected user Id: ", connectedUsersId)
        
        getSelectItems().then((items) => {
            let connectionsItems = items.filter(
                (item) => connectedUsersId.includes(item.userId)
            )
            setFiltered(connectionsItems)
        })
    }
    
    let handleClick = () => {
        const connectedUsersId = usersConnections.map((user) => user.connectedUserId)
        console.log("connected user Id: ", connectedUsersId)
        
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