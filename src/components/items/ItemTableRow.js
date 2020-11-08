import React from "react"
import { useHistory } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

export const ItemTableRow = ({item, type}) => {
    const history = useHistory()


    if (type === 'fiveCols') {
        return (
            <>
                <Table.Row onClick ={()=> history.push(`/items/edit/${item.id}`)}>
                    <Table.Cell collapsing>{ item.itemName }</Table.Cell>
                    <Table.Cell collapsing>{ item?.room }</Table.Cell>
                    <Table.Cell collapsing>{ item?.placement }</Table.Cell>
                    <Table.Cell collapsing>{ item.category?.name }</Table.Cell>
                    <Table.Cell >{ item?.description }</Table.Cell>
                    
                </Table.Row>
            </>
        )
    } else {
        return (
            <>
                <Table.Row onClick ={()=> history.push(`/items/edit/${item.id}`)}>
                    <Table.Cell collapsing>{ item.itemName }</Table.Cell>
                    <Table.Cell collapsing>{ item.location?.name }</Table.Cell>
                    <Table.Cell collapsing>{ item.user?.firstName }</Table.Cell>
                    <Table.Cell collapsing>{ item?.room }</Table.Cell>
                    <Table.Cell collapsing>{ item?.placement }</Table.Cell>
                    <Table.Cell collapsing>{ item.category?.name }</Table.Cell>
                    <Table.Cell >{ item?.description }</Table.Cell>
                    
                </Table.Row>
            </>
    
        )


    }
    
}