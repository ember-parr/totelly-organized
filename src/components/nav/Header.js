/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./header.css"
import HorizontalLogo from "../../images/LLogoHoriz.png";
import {UserContext} from '../user/UserProvider'
import { Segment, Image, Icon, Dropdown, Grid, Sticky, Menu } from 'semantic-ui-react'
// ***** IMPORTANT: for mvp, code commented out. line 34 & line 44 deal with "my profile" button. line 45 is placeholder for MVP *****
export const Header = () => {
    const {getUserById} = useContext(UserContext)
    const user = parseInt(localStorage.getItem("user"))
    const [currentUser, setCurrentUser] = useState({})
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
        // { key: 'profile', text: 'Your Profile', value: 'profile'},
        { key: 'logout', text: 'Log Out', value: 'logout'}
    ]

    const handleChange = (event, data) => {
        if (data.value === 'logout') {
            localStorage.clear()
            window.location.reload()
        } else if (data.value === 'profile') {
            console.log("account button pressed, commented out for MVP")
            // history.push("/account")
            history.push("/")
        }
    }



    return (
        <Sticky >
            <Menu borderless attached='top'>
                <Grid columns={2} className="headerContent">
                    <Grid.Column width={13} floated='left'>
                        <Segment basic>
                            <Image src={HorizontalLogo} size="medium" className='headerImage'/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3} floated='right'>
                        <Grid.Row stretched>
                            <Dropdown  trigger={trigger} options={options} onClick={handleChange}/>
                        </Grid.Row>
                        </Grid.Column>

                </Grid>
            </Menu>
        </Sticky>
            
            
                
                    
                
            
        
    );
};