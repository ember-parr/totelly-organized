import React, { useContext, useEffect, useState } from "react"
import {ItemContext} from './ItemProvider'
import { ItemTableRow } from './ItemTableRow'
import { useHistory } from 'react-router-dom'
import { Table } from "semantic-ui-react"


export const ItemTable = () => {
    const {Items, getItems, searchTerms } = useContext(ItemContext)

    const [filteredItems, setFiltered] = useState([])
    const domHistory = useHistory()

    useEffect(()=> {
        getItems()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = Items.filter(item => item.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(Items)
        }
    }, [searchTerms, Items])

    return (
        <>
        <button onClick={() => domHistory.push("/items/add")}>New Item</button>
        
        <Table celled selectable collapsing>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Item Name</Table.HeaderCell>
                    <Table.HeaderCell>Location</Table.HeaderCell>
                    <Table.HeaderCell>Room</Table.HeaderCell>
                    <Table.HeaderCell>Placement</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Details</Table.HeaderCell>
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