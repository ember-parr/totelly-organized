import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./home/Home";
import { DashboardView } from "./home/Dashboard"
import {ItemProvider} from "./items/ItemProvider";
import { LocationProvider } from "./locations/LocationProvider";
import {LocationTable} from "./locations/LocationTable";
import { LocationForm } from "./locations/LocationForm";
import {ItemTable} from "./items/ItemTable"
import {ItemForm} from "./items/ItemForm"
import { CategoryProvider } from "./categories/CategoryProvider";
import { UserProvider } from './user/UserProvider'
import { ConnectedUserDetail } from "./user/ConnectedUserDetail";
import { ConnectionProvider } from './connectedUsers/ConnectionProvider';
import {ConnectionList} from './connectedUsers/ConnectionList'
import { ConnectionSearch } from './connectedUsers/ConnectionSearch'

export const ApplicationViews = (props) => {
    return (
      <>
      <section className="pageContent">
        {/* Render the location list when http://localhost:3000/ */}
        <Route exact path="/home">
            <Home />
          </Route>
          
          <Route exact path="/">
            <DashboardView />
          </Route>

          <ItemProvider>
            <Route exact path="/items">
              <ItemTable />
            </Route>
          </ItemProvider>

          <ItemProvider>
            <CategoryProvider>
              <LocationProvider>
              <Route exact path="/items/add">
                <ItemForm/>
              </Route>
              </LocationProvider>
            </CategoryProvider>
          </ItemProvider>

          <ItemProvider>
            <CategoryProvider>
              <LocationProvider>
            <Route exact path="/items/edit/:itemId(\d+)">
              <ItemForm/>
            </Route>
            </LocationProvider>
            </CategoryProvider>
          </ItemProvider>

        <LocationProvider>
          <Route exact path="/locations">
            <LocationTable />
          </Route>
        </LocationProvider>

        <LocationProvider>
          <Route exact path="/locations/add">
            <LocationForm />
          </Route>
        </LocationProvider>

        <LocationProvider>
          <Route exact path="/locations/edit/:locationId(\d+)">
            <LocationForm />
          </Route>
        </LocationProvider>


        <UserProvider>
          <Route exact path="/users/edit/:userId(\d+)">
            <ConnectedUserDetail />
          </Route>
        </UserProvider>

        < UserProvider>
          <ConnectionProvider>
              <Route exact path="/users">
                  <ConnectionSearch />
                  <ConnectionList />
              </Route>
          </ConnectionProvider>
        </UserProvider>


        </section>
      </>
    );
  };
  