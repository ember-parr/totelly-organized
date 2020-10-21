import React from "react"
import { useHistory } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

export const ItemTableRow = ({item}) => {
    const history = useHistory()
    return (
        <>
       <Table.Row onClick ={()=> history.push(`/items/${item.id}/edit`)}>
        <Table.Cell>{ item.itemName }</Table.Cell>
        <Table.Cell>{ item.location?.name }</Table.Cell>
        <Table.Cell>{ item?.room }</Table.Cell>
        <Table.Cell>{ item?.placement }</Table.Cell>
        <Table.Cell>{ item.category?.name }</Table.Cell>
        <Table.Cell>{ item?.description }</Table.Cell>
     </Table.Row>
     </>

    )
}