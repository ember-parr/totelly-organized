/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import {ItemContext} from './ItemProvider'
import { ItemTableRow } from './ItemTableRow'
import { useHistory } from 'react-router-dom'
import { Table, Button } from "semantic-ui-react"


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
        <Button onClick={() => domHistory.push("/items/add")}>New Item</Button>
        
        <Table celled selectable collapsing compact size="small" className="pageComponent">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={1}>Item Name</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Location</Table.HeaderCell>
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