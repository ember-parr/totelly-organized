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
    // pulls in necessary Context variables
    const { addLocation, getLocationById, updateLocation, getLocations, deleteLocation } = useContext(LocationContext)
    const { addActivity } = useContext(ActivityContext)
    const {getItemsByLocation } = useContext(ItemContext)
    // useState variables to set evolving and/or dependant variables  (note: 'open' controls modal status)
    const [open, setOpen] = React.useState(false)
    const [location, setLocation] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [filteredItems, setItems] = useState([])
    // useParams to capture locationId from URL & useHistory to send user elsewhere when needed
    const {locationId} = useParams();
    const history = useHistory();
    // captures currently logged in user from local storage
    const user = localStorage.getItem("user")
    // formats date using npm package
    let dateFormat = require('dateformat')
    let now = new Date()
    let currentDate = dateFormat(now, "longDate")
    let currentTime = dateFormat(now, "shortTime")


    // handles input changes in location add and edit forms as needed
    const handleControlledInputChange = (event) => {
        const newLocation = { ...location }
        newLocation[event.target.name] = event.target.value
        setLocation(newLocation)
    }

    //custom color for toast alerts when location is updated or shared
    let myColor = { background: '#2b7a78', text: "#FFFFFF" };

    // on page load, get all details needed from database. 
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


    // funtion to create a new location object --OR-- update an existing location in database. 
    // also adds activity to database when a location is added or updated. (note: setting itemId and connectedUserId to '0' throws an error in json server)
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
                    itemId: 1,
                    locationId: location.id,
                    connectedUserId: 1,
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
                    itemId: 1,
                    locationId: location.id,
                    connectedUserId: 1,
                    date: currentDate + " at " + currentTime
                })
            }
        }
    }

    



    // if else statements to determin which view to display

    if(!locationId) {
    // ********** view that shows when a user is entering a new location **********
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
        // ********** view that shows when a user is viewing a location they DO own **********
        return (
            <div className="pageComponent">
                <Header>
                    <h2>{locationId ? `Update ${location.name}` : "Add New Location"}</h2>
                </Header>
                <Grid stackable divided centered>
                    <Grid.Row columns={1} centered>
                        <ConnectionProvider>
                            <ShareLocationSegment />
                        </ConnectionProvider>
                    </Grid.Row>
                            

                    <Grid.Row columns={2}>
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


                        <Grid.Column key={location.userId}>
                            
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
        // ********** view that shows when a user is viewing a location they do not own **********
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



