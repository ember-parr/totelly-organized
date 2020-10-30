/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from "react";
import "./header.css"
import HorizontalLogo from "../../images/LLogoHoriz.png";
import {UserContext} from '../user/UserProvider'
import { Segment, Image, Icon, Dropdown, Grid } from 'semantic-ui-react'

export const Header = () => {
    const {getUserById} = useContext(UserContext)
    const user = parseInt(localStorage.getItem("user"))
    const [currentUser, setCurrentUser] = useState({})

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
            disabled: true
        },
        { key: 'profile', text: 'Your Profile'},
        { key: 'logout', text: 'Log Out'}
    ]



    return (
        
            <Grid columns={2} className="headerContent">
                <Grid.Column width={13} floated='left'>
                    <Segment basic='very'>
                        <Image src={HorizontalLogo} size="medium" className='headerImage'/>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={3} floated='right'>
                    <Grid.Row stretched>
                        <Dropdown  trigger={trigger} options={options} />
                    </Grid.Row>
                    </Grid.Column>

            </Grid>
            
                
                    
                
            
        
    );
};