import React, { useState, createContext } from "react"

export const CategoryContext = createContext()

export const CategoryProvider = (props) => {
    const [Categories, setCategories] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getCategories = () => {
        return fetch(`http://localhost:8088/categories`)
        .then(result => result.json())
        .then(setCategories)
    }

    const addCategory = Category => {
        return fetch("http://localhost:8088/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Category)
        })
    }

    const getCategoryById = (id) => {
        return fetch(`http://localhost:8088/categories/${id}`)
        .then(result => result.json())
    }

    const deleteCategory = CategoryId => {
        return fetch(`http://localhost:8088/categories/${CategoryId}`, {
            method: "DELETE"
        })
    }

    const updateCategory = Category => {
        return fetch(`http://localhost:8088/categories/${Category.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Category)
        })
    }

    return (
        <CategoryContext.Provider value={{
            Categories, getCategories, addCategory, getCategoryById, deleteCategory, updateCategory, setSearchTerms, searchTerms
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}