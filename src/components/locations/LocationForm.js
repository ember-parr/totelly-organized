/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import { ActivityContext } from '../home/ActivityProvider'
import {ItemContext} from '../items/ItemProvider'
import { ItemTableRow } from '../items/ItemTableRow'
import { useHistory, useParams } from 'react-router-dom';
import {ShareLocationSegment } from './ShareLocationSegment'
import Notifications, {notify} from 'react-notify-toast';
import {ConnectionProvider} from '../connectedUsers/ConnectionProvider'
import { SharedWithSegment } from './SharedWithSegment'
import { Button, Grid, Header, Icon, Form, Item, Modal, Table } from 'semantic-ui-react'

export const LocationForm = () => {
    const { addLocation, getLocationById, updateLocation, getLocations, deleteLocation } = useContext(LocationContext)
    const { addActivity } = useContext(ActivityContext)
    const [location, setLocation] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const {locationId} = useParams();
    const history = useHistory();
    const user = localStorage.getItem("user")
    const [open, setOpen] = React.useState(false)
    let dateFormat = require('dateformat')
    let now = new Date()
    let currentDate = dateFormat(now, "longDate")
    let currentTime = dateFormat(now, "shortTime")
    const {getItemsByLocation } = useContext(ItemContext)

    const [filteredItems, setItems] = useState([])

    const handleControlledInputChange = (event) => {
        const newLocation = { ...location }
        newLocation[event.target.name] = event.target.value
        setLocation(newLocation)
    }
    let myColor = { background: '#2b7a78', text: "#FFFFFF" };

    useEffect(() => {
        getLocations().then(() => {
            if (locationId){
                getLocationById(locationId)
                .then(location => {
                    setLocation(location)
                    setIsLoading(false)
                }).then(() => {
                    getItemsByLocation(locationId)
                    .then(items => {
                        setItems(items)
                    })
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    const constructLocationObject = () => {
        if (parseInt(locationId) === 0) {
            window.alert("Please select a location")
        } else {
            setIsLoading(true);
            if (locationId){
                updateLocation({
                    id: location.id,
                    name: location.name,
                    description: location.description,
                    userId: parseInt(user)
                })
                addActivity({
                    activityType: "Updated Their Location",
                    userId: parseInt(user),
                    itemId: 0,
                    locationId: location.id,
                    connectedUserId: 0,
                    date: currentDate + " at " + currentTime
                })
            }else {
                addLocation({
                    name: location.name,
                    description: location.description,
                    userId: parseInt(user)
                })
                addActivity({
                    activityType: "Added A New Location",
                    userId: parseInt(user),
                    itemId: 0,
                    locationId: location.id,
                    connectedUserId: 0,
                    date: currentDate + " at " + currentTime
                })
            }
        }
    }




    // const [values, setValues] = useState({itemName: '', description: '', room: '', categoryId: 2, locationId: 1, placement: '', notes: '', lists: []})
    if(!locationId) {
    return (
        <div class="pageComponent">
            <Grid.Column>
                        <Header>
                            <h2>{locationId ? `Update ${location.name}` : "Add New Location"}</h2>
                                <h4>This is a brand new location</h4>
                        </Header>
                        
                        <div>
                        <form >
                            <Grid.Row><Form.Input  onChange={handleControlledInputChange} name="name" icon='hand point up outline' iconPosition='left' placeholder='Name of Location' size='large' defaultValue={location.name} /> </Grid.Row> <br/>
                            <Grid.Row><Form.Input onChange={handleControlledInputChange} name="description" icon='hand peace outline' iconPosition='left' placeholder='Description' size='large' defaultValue={location.description}/> </Grid.Row><br/>
                            <Grid.Row><Form.Button animated disabled={isLoading} onClick={event=> {
                                event.preventDefault() 
                                constructLocationObject()
                                }}>
                                <Button.Content visible>{locationId ? "Save Changes" : "Add Location"}</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Form.Button></Grid.Row>
                            </form>
                        </div>
                    </Grid.Column>
        </div>
    )} else if (locationId && location.userId===parseInt(user)) {
        return (
            <div class="pageComponent">
                <Header>
                    <h2>{locationId ? `Update ${location.name}` : "Add New Location"}</h2>
                </Header>
                <Grid stackable divided centered>
                    <Grid.Row columns={1} centered>
                        <ConnectionProvider>
                            <ShareLocationSegment />
                        </ConnectionProvider>
                    </Grid.Row>
                            

                    <Grid.Row columns={2} fluid>
                    <Grid.Column>
                        <form >
                            
                                <h4>{`Edit ${location.name}'s Details`}</h4>
                                    <label>Name of Location</label>
                                    <Form.Input  
                                        onChange={handleControlledInputChange} 
                                        name="name" icon='hand point up outline' 
                                        iconPosition='left' 
                                        placeholder='Name of Location' 
                                        size='large' 
                                        defaultValue={location.name} 
                                    /> 
                            
                            <br/>
                            
                                <label>Description</label>
                                <Form.Input 
                                    onChange={handleControlledInputChange} 
                                    name="description" 
                                    icon='hand peace outline' 
                                    iconPosition='left' 
                                    placeholder='Description' 
                                    size='large' 
                                    defaultValue={location.description}
                                /> 
                            
                            <br/>
                            
                                <Form.Button 
                                    animated 
                                    disabled={isLoading} 
                                    
                                    onClick={event=> {
                                        event.preventDefault() 
                                        constructLocationObject()
                                        notify.show('Location Updated!', "custom", 4000, myColor)
                                        }}>
                                    <Button.Content visible>{locationId ? "Save Changes" : "Add Location"}</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Form.Button>
                                        <Notifications />
                                <Modal 
                                    closeIcon 
                                    open={open} 
                                    trigger={<Button style={{backgroundColor: 'grey', width: '130px', margin: "15px 0px"}}> <Icon name='trash alternate outline' /> {`Delete`}</Button>} 
                                    onClose={() => setOpen(false)} 
                                    onOpen={(event) => {
                                        event.preventDefault()
                                        setOpen(true)} }
                                >
                                    <Header icon='trash alternate outline' content={`Delete ${location.name}?`} />
                                    <Modal.Content>
                                        <p>
                                        This action cannot be reversed.<br />
                                        Items in this location will also be deleted <br />
                                        Are you sure you want to permanently delete this location?  
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
                                                deleteLocation(locationId)
                                                history.push("/locations")
                                            }}>
                                        <Icon name='checkmark' /> Yes
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                                
                            </form>
                        </Grid.Column>


                        <Grid.Column>
                            
                                <h4>Shared with:</h4>
                                    <SharedWithSegment location={location} />



                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1} centered>

                        <Table unstackable celled selectable collapsing compact size="small" className="pageComponent" style={{margin: '35px 0 0 0'}}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Item Name</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Room</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Placement</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Category</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Details</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                
                    <Table.Body>
                    {filteredItems?.map(item => {
                        return <ItemTableRow key={item.id} item={item}  type={'fiveCols'} />
                    })}

                    </Table.Body>
                </Table>
                </Grid.Row>
                    </Grid>
            </div>
        )
    } else if (locationId && location.userId!==parseInt(user)) {
        return (
            
            <div className="pageComponent">
                <Item>
                    <Item.Content>
                        <Item.Header as='h2'>{`${location.name}`}</Item.Header>
                        <Item.Header as='h4'>{`${location.user?.firstName} ${location.user?.lastName} entered this location`}</Item.Header>
                        <Item.Description>Description:   {location.description}</Item.Description>
                    </Item.Content>
                </Item>

                <Table unstackable celled selectable collapsing compact size="small" className="pageComponent">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Item Name</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Room</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Placement</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Category</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Details</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                
                    <Table.Body>
                    {filteredItems?.map(item => {
                            return <ItemTableRow key={item.id} item={item} type={'fiveCols'}/>
                        })}

                    </Table.Body>
                </Table>


                
            </div>
        )
    };
    
    
}



