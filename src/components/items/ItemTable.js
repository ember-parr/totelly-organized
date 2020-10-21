import React, { useContext, useEffect, useState } from "react"
import {ItemContext} from './ItemProvider'
import { ItemTableRow } from './ItemTableRow'
import { useHistory } from 'react-router-dom'


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
        <div className="items">
            {filteredItems.map(item => {
                return <ItemTableRow key={item.id} item={item} />
            })}
        </div>

        </>
    )
}