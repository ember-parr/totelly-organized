import React from "react";
import { ApplicationViews } from "./ApplicationViews";
import { SignIn } from "./auth/SignIn";
import { Register } from "./auth/Register";
import { Route, Redirect } from "react-router-dom";
import SidebarNavigation from "./nav/Navbar";
import { Footer } from "./nav/Footer";

export const TotellyOrganized = () => (
  <>
    <Route
      
    render={() => {
      if (localStorage.getItem("user")) {
        return (
          <>
            <SidebarNavigation/>
            <ApplicationViews />
            <Footer/>
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
);
