/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "../categories/CategoryProvider"
import { ItemContext } from "./ItemProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Grid, Header, Icon, Form, Dropdown } from 'semantic-ui-react'

export const ItemForm = () => {
    const { addItem, getItemById, updateItem } = useContext(ItemContext)
    const { Categories, getCategories } = useContext(CategoryContext)
    const [item, setItem] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const {itemId} = useParams();
    const history = useHistory();
    const user = localStorage.getItem("user")

    const handleControlledInputChange = (event) => {
        const newItem = { ...item }
        console.log("category: ", item.categoryId)
        newItem[event.target.name] = event.target.value
        setItem(newItem)
    }

    const handleDropdown = (event, data)=> {
        const newItem = { ...item }
        console.log("category: ", item.categoryId)
        newItem[data.name] = data.value
        setItem(newItem)
    }

    useEffect(() => {
        getCategories().then().then(() => {
            if (itemId){
                getItemById(itemId)
                .then(item => {
                    setItem(item)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    const constructItemObject = () => {
        if (parseInt(item.locationId) === 0) {
            window.alert("Please select a location")
        } else {
            setIsLoading(true);
            if (itemId){
                updateItem({
                    id: item.id,
                    itemName: item.itemName,
                    description: item.description,
                    room: item.room,
                    placement: item.placement,
                    notes: item.notes,
                    categoryId: item.categoryId,
                    locationId: item.locationId,
                    dateLastSearched: 1601409045668,
                    userId: parseInt(user)
                })
                .then(() => history.push(`/items`))
            }else {
                addItem({
                    itemName: item.itemName,
                    description: item.description,
                    room: item.room,
                    placement: item.placement,
                    notes: item.notes,
                    categoryId: item.categoryId,
                    locationId: 1,
                    dateLastSearched: 1601409045668,
                    userId: parseInt(user)
                })
                .then(() => history.push("/items"))
            }
        }
    }




    // const [values, setValues] = useState({itemName: '', description: '', room: '', categoryId: 2, locationId: 1, placement: '', notes: '', lists: []})

    return (
        <div>
            <Grid.Column>
                        <Header>
                            <h2>{itemId ? `Update ${item.itemName}` : "Add New Item"}</h2>
                        </Header>
                        <div>
                        <form >
                            <Grid.Row><Form.Input  onChange={handleControlledInputChange} name="itemName" icon='hand point up outline' iconPosition='left' placeholder='Name of Item' size='large' defaultValue={item.itemName} /> </Grid.Row> <br/>
                            <Grid.Row><Form.Input onChange={handleControlledInputChange} name="description" icon='hand peace outline' iconPosition='left' placeholder='Description' size='large' defaultValue={item.description}/> </Grid.Row><br/>
                            <Grid.Row><Form.Input onChange={handleControlledInputChange} name="room" icon='envelope outline' iconPosition='left' placeholder='Room' size='large' defaultValue={item.room}/> </Grid.Row><br/>
                            <Grid.Row><Form.Input onChange={handleControlledInputChange} name="placement" icon='mobile alternate' iconPosition='left' placeholder='Placement' size='large' defaultValue={item.placement}/> </Grid.Row> <br/>
                            <Grid.Row><Form.Input onChange={handleControlledInputChange} name="notes" icon='mobile alternate' iconPosition='left' placeholder='Notes' size='large' defaultValue={item.notes}/> </Grid.Row> <br/>
                            <Grid.Row>
                                    <Dropdown placeholder='Select a Category' options={Categories.map(cat => (
                                        {
                                            key: cat.id,
                                            text: cat.name,
                                            value: cat.id
                                        }
                                    ))} selection onChange={handleDropdown} name="categoryId" defaultValue={item.categoryId} label="categories" search />

                            </Grid.Row><br />
                            <Grid.Row><Form.Button animated disabled={isLoading} onClick={event=> {
                                event.preventDefault() 
                                constructItemObject()
                                }}>
                                <Button.Content visible>{itemId ? "Save Changes" : "Add Item"}</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Form.Button></Grid.Row>
                            </form>
                        </div>
                    </Grid.Column>
        </div>
    );
    
    
}



