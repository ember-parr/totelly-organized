import React from "react"
import { useHistory } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

export const LocationTableRow = ({location}) => {
    const history = useHistory()
    return (
        <>
            <Table.Row onClick ={()=> history.push(`/locations/edit/${location.id}`)}>
                <Table.Cell>{ location.name }</Table.Cell>
                <Table.Cell>{ location.user.firstName }</Table.Cell>
                <Table.Cell>{ location.description }</Table.Cell>
                <Table.Cell>Shared With:</Table.Cell>
            </Table.Row>
        </>
    )
}