import React from "react";
import { ApplicationViews } from "./ApplicationViews";
import { SignIn } from "./auth/SignIn";
import { Register } from "./auth/Register";
import { Route, Redirect } from "react-router-dom";
import { Footer } from "./nav/Footer";
import {UserProvider} from './user/UserProvider'
import {  Menu, Segment, Sidebar } from 'semantic-ui-react'
import { SidebarNavitation } from "./nav/Navbar";
import { Header } from './nav/Header'
import "./TotellyOrganized.css"


//function to enable sliding content 
function exampleReducer(state, action) {
  switch (action.type) {
    case 'SHOW_ANIMATION':
      return { ...state, animation: action.animation, visible: true}
    case 'HIDE_ANIMATION':
        return { ...state, animation: action.animation, visible: false }  
    case 'ICON_CLICKED':
        return { ...state, color: "teal", active: true}
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
  const [state ] = React.useReducer(exampleReducer, {
    animation: 'show',
    direction: "left",
    dimmed: false,
    visible: false,
    color: 'grey'
  })
  const { dimmed } = state
   
  return (
  <>
  <main >
    <UserProvider>
      <Header />
    </UserProvider>
      <section className="pageContent">
    <Route
      render={() => {
        if (localStorage.getItem("user")) {
          return (
            <>
              <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' }}  >
              <Sidebar as={Menu} animation='push' vertical icon='labeled' direction='left' visible style={{backgroundColor: '#def2f1'}}>
                <SidebarNavitation />
              </Sidebar>
              <Sidebar.Pusher dimmed={dimmed} style={{margin: '0 0 0 -100px'}}>
                <Segment basic style={{margin: '0 30px 0 0'}}>
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
</section>
    </main>
  </>
  )
};
