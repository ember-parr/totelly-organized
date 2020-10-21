import React from "react"
import { useHistory } from 'react-router-dom'

export const ItemTableRow = ({item}) => {
    const domHistory = useHistory()
    return (
       <div> { item.itemName } </div>
    )
}