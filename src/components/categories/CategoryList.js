/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from "react"
import { CategoryContext } from './CategoryProvider'
import { Dropdown } from 'semantic-ui-react'


  
export const CategoryList = ({category}) => {
    const { Categories, getCategories, searchTerms } = useContext(CategoryContext)
    const [filteredCategories, setFiltered] = useState([])

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = Categories.filter(category => category.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(Categories)
        }
    }, [searchTerms, Categories])

    const options = [
        filteredCategories.map(category => {
            return `{key:${category.id}, name: "${category.name}", value: ${category.id}}`
        })
    ]

    return (
        <Dropdown clearable options={options} selection />
    )
}