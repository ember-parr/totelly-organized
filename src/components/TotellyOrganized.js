import React from "react";
import { ApplicationViews } from "./ApplicationViews";
import { SignIn } from "./auth/SignIn";
import { Register } from "./auth/Register";
import { Route, Redirect } from "react-router-dom";
import { Footer } from "./nav/Footer";
import {UserProvider} from './user/UserProvider'
import {  Menu, Segment, Sidebar } from 'semantic-ui-react'
import { SidebarNavigation } from "./nav/Navbar";
import { Header } from './nav/Header'
import "./TotellyOrganized.css"




//whole page render
export const TotellyOrganized = () => {

  return (
  <>
  <main >
      <section className="pageContent">
    <Route
      render={() => {
        if (localStorage.getItem("user")) {
          return (
            <>
    <UserProvider>
      <Header />
    </UserProvider>
              <Sidebar.Pushable    >
              <Sidebar as={Menu} animation='push' vertical icon='labeled' direction='left' visible style={{backgroundColor: '#def2f1'}}>
                <SidebarNavigation />
              </Sidebar>
              <Sidebar.Pusher className='pusherContent' >
                <Segment basic >
                  <ApplicationViews />
                  <Footer/>
                </Segment>z
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
