/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState, createRef} from "react";
import { useHistory } from "react-router-dom";
import "./header.css"
import _ from 'lodash'
import HorizontalLogo from "../../images/LLogoHoriz.png";
import { MyAccountPlaceholder } from '../account/MyAccountPlaceholder'
import {UserContext} from '../user/UserProvider'
import { Segment, Image, Icon, Dropdown, Grid, Sticky, Menu } from 'semantic-ui-react'

export const Header = () => {
    const {getUserById} = useContext(UserContext)
    const user = parseInt(localStorage.getItem("user"))
    const [currentUser, setCurrentUser] = useState({})
    const contextRef = createRef()
    const history = useHistory()

    useEffect(()=> {
        getUserById(user)
        .then(setCurrentUser)
    }, [])


    const trigger = (
        <span>
            <Icon name='user' /> Hello, {currentUser?.firstName}
        </span>
    )

    const options = [
        {
            key: 'user',
            text: "Logged in as: " + currentUser?.firstName,
            value: 'user',
            disabled: true
        },
        { key: 'profile', text: 'Your Profile', value: 'profile'},
        { key: 'logout', text: 'Log Out', value: 'logout'}
    ]

    const handleChange = (event, data) => {
        console.log("data.value", data.value)
        console.log("data.key", data.key)
        if (data.value === 'logout') {
            localStorage.clear()
            window.location.reload()
        } else if (data.value === 'profile') {
            history.push("/account")
        }
    }



    return (
        <Sticky >
            <Menu attached='top'>
                <Grid columns={2} className="headerContent">
                    <Grid.Column width={13} floated='left'>
                        <Segment basic='very'>
                            <Image src={HorizontalLogo} size="medium" className='headerImage'/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3} floated='right'>
                        <Grid.Row stretched>
                            <Dropdown  trigger={trigger} options={options} onChange={handleChange}/>
                        </Grid.Row>
                        </Grid.Column>

                </Grid>
            </Menu>
        </Sticky>
            
            
                
                    
                
            
        
    );
};