/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { ItemContext } from "./ItemProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Grid, Header, Icon, Segment, Image, Modal, Form } from 'semantic-ui-react'

export const ItemForm = () => {
    const { addItem, getItemById, updateItem } = useContext(ItemContext)
    const [item, setItem] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const {itemId} = useParams();
    const history = useHistory();
    const user = localStorage.getItem("user")

    const handleControlledInputChange = (event) => {
        const newItem = { ...item }
        newItem[event.target.name] = event.target.value
        setItem(newItem)
    }
    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    useEffect(() => {
            if (itemId){
                getItemById(itemId)
                .then(item => {
                    setItem(item)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
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
                    userId: parseInt(item.userId)
                })
                .then(() => history.push(`/items/detail/${item.id}`))
            }else {
                addItem({
                    itemName: values.itemName,
                    description: values.description,
                    room: values.room,
                    placement: values.placement,
                    notes: values.notes,
                    categoryId: values.categoryId,
                    locationId: values.locationId,
                    dateLastSearched: 1601409045668,
                    userId: parseInt(user)
                })
                .then(() => history.push("/items"))
            }
        }
    }
    const [values, setValues] = useState({itemName: '', description: '', room: '', categoryId: 2, locationId: 1, placement: '', notes: '', lists: []})

    return (
        <div>
          <Grid.Column>
                        <Header>
                            <h2>Add New Item</h2>
                        </Header>
                        <div>
                        <form >
                          <Grid.Row><Form.Input onChange={handleInputChange} name="itemName" icon='hand point up outline' iconPosition='left' placeholder='Name of Item' size='large' value={values.itemName}/> </Grid.Row> <br/>
                          <Grid.Row><Form.Input onChange={handleInputChange} name="description" icon='hand peace outline' iconPosition='left' placeholder='Description' size='large' value={values.description}/> </Grid.Row><br/>
                          <Grid.Row><Form.Input onChange={handleInputChange} name="room" icon='envelope outline' iconPosition='left' placeholder='Room' size='large' value={values.room}/> </Grid.Row><br/>
                          <Grid.Row><Form.Input onChange={handleInputChange} name="placement" icon='mobile alternate' iconPosition='left' placeholder='Placement' size='large' value={values.placement}/> </Grid.Row> <br/>
                          <Grid.Row><Form.Input onChange={handleInputChange} name="notes" icon='mobile alternate' iconPosition='left' placeholder='Notes' size='large' value={values.notes}/> </Grid.Row> <br/>
                          <Grid.Row><Form.Button animated onClick={constructItemObject}>
                              <Button.Content visible>Register</Button.Content>
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



