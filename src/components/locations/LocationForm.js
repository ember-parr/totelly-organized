/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import { ActivityContext } from '../home/ActivityProvider'
import { useHistory, useParams } from 'react-router-dom';
import {ShareLocationSegment } from './ShareLocationSegment'
import {ConnectionProvider} from '../connectedUsers/ConnectionProvider'
import { SharedWithSegment } from './SharedWithSegment'
import { Button, Grid, Header, Icon, Form, Item, Modal } from 'semantic-ui-react'

export const LocationForm = () => {
    const { addLocation, getLocationById, updateLocation, getLocations, deleteLocation } = useContext(LocationContext)
    const { addFeed } = useContext(ActivityContext)
    const [location, setLocation] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const {locationId} = useParams();
    const history = useHistory();
    const user = localStorage.getItem("user")
    const [open, setOpen] = React.useState(false)
    let dateFormat = require('dateformat')
    let now = new Date()
    let currentDate = dateFormat(now, "longDate")

    const handleControlledInputChange = (event) => {
        const newLocation = { ...location }
        newLocation[event.target.name] = event.target.value
        setLocation(newLocation)
    }

    useEffect(() => {
        getLocations().then().then(() => {
            if (locationId){
                getLocationById(locationId)
                .then(location => {
                    setLocation(location)
                    setIsLoading(false)
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
                addFeed({
                    activityType: "Updated Their Location",
                    dataOne: parseInt(user),
                    dataTwo: location.name,
                    date: currentDate
                })
                .then(() => history.push(`/locations`))
            }else {
                addLocation({
                    name: location.name,
                    description: location.description,
                    userId: parseInt(user)
                })
                addFeed({
                    activityType: "Added A New Location",
                    dataOne: parseInt(user),
                    dataTwo: location.name,
                    date: currentDate
                })
                .then(() => history.push("/locations"))
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
                        <ConnectionProvider>
                            <ShareLocationSegment />
                        </ConnectionProvider>
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
                <ConnectionProvider>
                    <ShareLocationSegment />
                </ConnectionProvider>
                            
                <Grid columns={2} stackable style={{width: "775px"}} divided>
                    <Grid.Column>
                        <form >
                            <Grid.Row>
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
                            </Grid.Row> 
                            <br/>
                            <Grid.Row>
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
                            </Grid.Row>
                            <br/>
                            <Grid.Row>
                                <Form.Button 
                                    animated 
                                    disabled={isLoading} 
                                    
                                    onClick={event=> {
                                        event.preventDefault() 
                                        constructLocationObject()
                                        }}>
                                    <Button.Content visible>{locationId ? "Save Changes" : "Add Location"}</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Form.Button>
                            
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
                                                history.push('/locations')
                                            }}>
                                        <Icon name='checkmark' /> Yes
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                                </Grid.Row>
                            </form>
                        </Grid.Column>


                        <Grid.Column>
                            
                                <h4>Shared with:</h4>
                                    <SharedWithSegment location={location} />



                        </Grid.Column>
                        </Grid>
            </div>
        )
    } else if (locationId && location.userId!==parseInt(user)) {
        return (
            <div class="pageComponent">
                <Header>
                    <h2>{`${location.name}`}</h2>
                    <h3>{`${location.user?.firstName} ${location.user?.lastName} entered this location`}</h3>
                </Header>

                <Item>
                    <Item.Content>
                        <h5>Description:   {location.description}</h5>
                    </Item.Content>
                </Item>
            </div>
        )
    };
    
    
}



