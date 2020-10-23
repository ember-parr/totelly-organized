/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Grid, Header, Icon, Form } from 'semantic-ui-react'

export const LocationForm = () => {
    const { addLocation, getLocationById, updateLocation, getLocations } = useContext(LocationContext)
    const [location, setLocation] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const {locationId} = useParams();
    const history = useHistory();
    const user = localStorage.getItem("user")

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
                .then(() => history.push(`/locations`))
            }else {
                addLocation({
                    name: location.name,
                    description: location.description,
                    userId: parseInt(user)
                })
                .then(() => history.push("/locations"))
            }
        }
    }




    // const [values, setValues] = useState({itemName: '', description: '', room: '', categoryId: 2, locationId: 1, placement: '', notes: '', lists: []})

    return (
        <div>
            <Grid.Column>
                        <Header>
                            <h2>{locationId ? `Update ${location.name}` : "Add New Location"}</h2>
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
    );
    
    
}



