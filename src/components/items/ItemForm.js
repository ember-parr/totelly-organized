/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "../categories/CategoryProvider"
import { LocationContext } from "../locations/LocationProvider"
import { ItemContext } from "./ItemProvider"
import { ActivityContext } from '../home/ActivityProvider'
import { useHistory, useParams } from 'react-router-dom';
import { Button, Grid, Header, Icon, Form, Dropdown, Item, Modal } from 'semantic-ui-react'

export const ItemForm = () => {
    const { addItem, getItemById, updateItem, deleteItem } = useContext(ItemContext)
    const { Categories, getCategories } = useContext(CategoryContext)
    const { Locations, getLocations, addLocation } = useContext(LocationContext)
    const { addActivity } = useContext(ActivityContext)
    const [item, setItem] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const {itemId} = useParams();
    const history = useHistory();
    const user = localStorage.getItem("user")
    const [open, setOpen] = React.useState(false)
    const usersLocations = Locations.filter(loc => loc.userId === parseInt(user))
    let currentLocation = item.locationId
    let dateFormat = require('dateformat')
    let now = new Date()
    let currentDate = dateFormat(now, "longDate")

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

    const handleLocationAddition = (e, {value}) => {
        let newLocation = addLocation({
            name: value,
            description: "",
            userId: parseInt(user)
        })
        newLocation[e.target.name] = e.target.value
        currentLocation = newLocation
        getLocations()
    }


    useEffect(() => {
        getCategories().then(getLocations).then(() => {
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
        if (!item.itemName) {
            window.alert("Please enter a name for the item")
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
                addActivity({
                    activityType: "Updated an Item",
                    userId: parseInt(user),
                    itemId: item.id,
                    locationId: 0,
                    connectedUserId: 0,
                    date: currentDate
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
                    locationId: item.locationId,
                    dateLastSearched: 1601409045668,
                    userId: parseInt(user)
                })
                addActivity({
                    activityType: "Added A New Item",
                    userId: parseInt(user),
                    itemId: item.id,
                    locationId: 0,
                    connectedUserId: 0,
                    date: currentDate
                })
                .then(() => history.push("/items"))
            }
        }
    }

    if (!itemId) {
        // if there is no itemId, meaning the user is creating a new item
        return (
            <div class="pageComponent">
                <Grid.Column>
                            <Header>
                                <h2>{"Add New Item"}</h2>
                            </Header>
                            <div>
                            <form >
                            
                                <Grid.Row><Form.Input  onChange={handleControlledInputChange} name="itemName" icon='plus square outline' iconPosition='left' placeholder='Name of Item'  defaultValue={item.itemName} /> </Grid.Row> <br/>
                                <Grid.Row><Form.Input onChange={handleControlledInputChange} name="description" icon='newspaper outline' iconPosition='left' placeholder='Description'  defaultValue={item.description}/> </Grid.Row><br/>
                                <Grid.Row><Form.Input onChange={handleControlledInputChange} name="room" icon='hotel' iconPosition='left' placeholder='Room'  defaultValue={item.room}/> </Grid.Row><br/>
                                <Grid.Row><Form.Input onChange={handleControlledInputChange} name="placement" icon='box' iconPosition='left' placeholder='Placement'  defaultValue={item.placement}/> </Grid.Row> <br/>
                                <Grid.Row><Form.TextArea onChange={handleControlledInputChange} name="notes" icon='write'  placeholder='Notes'  defaultValue={item.notes}/> </Grid.Row> <br/>
                                <Grid.Row>
                                        <Form.Select placeholder='Select a Category' options={Categories.map(cat => (
                                            {
                                                key: cat.id,
                                                text: cat.name,
                                                value: cat.id
                                            }
                                        ))} selection onChange={handleDropdown} name="categoryId" defaultValue={item.categoryId} search />

                                </Grid.Row><br />
                                <Grid.Row>
                                        <Dropdown 
                                            value={currentLocation}
                                            placeholder='Select (or add) a Location' 
                                            options={usersLocations.map(loc => (
                                                {
                                                    key: loc.id,
                                                    text: loc.name,
                                                    value: loc.id
                                                }
                                            ))} 
                                            onChange={handleDropdown} 
                                            onAddItem={handleLocationAddition}
                                            name="locationId" 
                                            label="locations" 
                                            allowAdditions
                                            selection 
                                            search 
                                            />

                                </Grid.Row><br />
                                <Grid.Row>                                
                                    <Form.Button animated disabled={isLoading} onClick={event=> {
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
    )} else if (itemId && item.userId===parseInt(user)) {
        // if there is an itemId, so the user is viewing item details, and the item's userId matches the logged in userID
        return (
            <div class="pageComponent">
                <Grid.Column>
                            <Header>
                                <h2>{itemId ? `Update ${item.itemName}` : "Add New Item"}</h2>
                                                            <h3>This is your item</h3>
                            </Header>
                            <div>
                            <form >
                                <Grid.Row><Form.Input  onChange={handleControlledInputChange} name="itemName" icon='plus square outline' iconPosition='left' placeholder='Name of Item' size='large' defaultValue={item.itemName} /> </Grid.Row> <br/>
                                <Grid.Row><Form.Input onChange={handleControlledInputChange} name="description" icon='newspaper outline' iconPosition='left' placeholder='Description' size='large' defaultValue={item.description}/> </Grid.Row><br/>
                                <Grid.Row><Form.Input onChange={handleControlledInputChange} name="room" icon='hotel' iconPosition='left' placeholder='Room' size='large' defaultValue={item.room}/> </Grid.Row><br/>
                                <Grid.Row><Form.Input onChange={handleControlledInputChange} name="placement" icon='box' iconPosition='left' placeholder='Placement' size='large' defaultValue={item.placement}/> </Grid.Row> <br/>
                                <Grid.Row><Form.Input onChange={handleControlledInputChange} name="notes" icon='write' iconPosition='left' placeholder='Notes' size='large' defaultValue={item.notes}/> </Grid.Row> <br/>
                                <Grid.Row>
                                        <Dropdown placeholder='Select a Category' options={Categories.map(cat => (
                                            {
                                                key: cat.id,
                                                text: cat.name,
                                                value: cat.id
                                            }
                                        ))} selection onChange={handleDropdown} name="categoryId" defaultValue={item.categoryId} label="categories" search />
    
                                </Grid.Row><br />
                                <Grid.Row>
                                <Dropdown 
                                        value={currentLocation}
                                        placeholder='Select (or add) a Location' 
                                        defaultValue={item.locationId}
                                        options={usersLocations.map(loc => (
                                            {
                                                key: loc.id,
                                                text: loc.name,
                                                value: loc.id
                                            }
                                        )).sort()} 
                                        onChange={handleDropdown} 
                                        onAddItem={handleLocationAddition}
                                        name="locationId" 
                                        label="locations" 
                                        allowAdditions
                                        selection 
                                        search 
                                        />

                            </Grid.Row><br />
                                <Grid.Row>
                                    
                                    
                                    <Form.Button 
                                        animated 
                                        disabled={isLoading} 
                                        onClick={event=> {
                                            event.preventDefault() 
                                            constructItemObject()
                                            }}>
                                    <Button.Content visible>{itemId ? "Save Changes" : "Add Item"}</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Form.Button>
    
    
                        <Modal 
                            closeIcon 
                            value={itemId}
                            open={open} 
                            trigger={<Button style={{backgroundColor: 'grey', width: '130px'}}> <Icon name='trash alternate outline' /> </Button>} 
                            onClose={() => setOpen(false)} 
                            onOpen={(event) => {
                                event.preventDefault()
                                setOpen(true)} }
                        >
                            <Header icon='trash alternate outline' content={`Delete ${item.itemName}?`} />
                            <Modal.Content>
                                <p>
                                This action cannot be reversed.<br />
                                Are you sure you want to permanently delete this item?  
                                </p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='red' onClick={() => setOpen(false)}>
                                <Icon name='remove' /> No
                                </Button>
                                <Button 
                                    color='green' 
                                    onClick={() => { 
                                        setOpen(false)
                                        deleteItem(itemId)
                                        history.push('/items')
                                    }}>
                                <Icon name='checkmark' /> Yes
                                </Button>
                            </Modal.Actions>
                        </Modal>
                        </Grid.Row>
                                </form>
                            </div>
                        </Grid.Column>
    
    
                        
            </div>
        )} else if (itemId && item.userId !== parseInt(user)) {
            // if there is an itemId, so the user is viewing item details, and the item's userId does NOT match the logged in userID
            return (
                <div class="pageComponent">
                    <Header>
                        <h2>{`${item.itemName}`}</h2>
                        <h3>{`${item.user?.firstName} ${item.user?.lastName} entered this item`}</h3>
                    </Header>

                    <Item>
                        <Item.Content>
                            <h5>Location:   {item.location?.name}</h5>
                            <h5>Room:   {item.room}</h5>
                            <h5>Placement:   {item.placement}</h5>
                            <h5>Category:   {item.category?.name}</h5>
                            <h5>Description:   {item.description}</h5>
                            <h5>Notes:   {item.notes}</h5>
                        </Item.Content>
                    </Item>
                </div>
            )
    } else {
        return(
            <div>
                <h2>something broke</h2>
            </div>
        )
    }
    
    
}



