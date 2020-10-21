import React from "react";
import { ApplicationViews } from "./ApplicationViews";
import { SignIn } from "./auth/SignIn";
import { Register } from "./auth/Register";
import { Route, Redirect } from "react-router-dom";
import { Footer } from "./nav/Footer";
import {  Icon, Menu, Segment, Sidebar, Button, Grid, Image, Header } from 'semantic-ui-react'


//function to enable sliding content 
function exampleReducer(state, action) {
  switch (action.type) {
    case 'SHOW_ANIMATION':
      return { ...state, animation: action.animation, visible: true }
    case 'HIDE_ANIMATION':
        return { ...state, animation: action.animation, visible: false }  
    case 'CHANGE_DIMMED':
      return { ...state, dimmed: action.dimmed }
    case 'CHANGE_DIRECTION':
      return { ...state, direction: action.direction, visible: false }
    default:
      throw new Error()
  }
}

//whole page render
export const TotellyOrganized = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  })
  const { animation, dimmed, direction, visible } = state
  
  
  return (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("user")) {
          return (
            <>
              <Button onMouseOver={() => dispatch({ type: 'SHOW_ANIMATION', animation: 'push' })} onMouseOut={() => dispatch({ type: 'HIDE_ANIMATION', animation: 'push' })}> Menu </Button>


      <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' }}>
        <Sidebar as={Menu} animation={animation} direction={direction} icon='labeled' vertical visible={visible} width='thin' >
          <Menu.Item as='a'>
            <Icon name='home' />
            Home
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='gamepad' />
            Games
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='camera' />
            Channels
          </Menu.Item>
        </Sidebar>

      <Sidebar.Pusher dimmed={dimmed && visible}>
        <Segment basic>
          
              <ApplicationViews />
              <Footer/>
        </Segment>


      </Sidebar.Pusher>
      </Sidebar.Pushable>
</>
);
      } else {
        return <Redirect to="/login" />;
      }
    }}
    />
    <Route path="/login">
      <SignIn />
    </Route>

    <Route path="/register">
      <Register />
    </Route>
    
  </>
  )
};
