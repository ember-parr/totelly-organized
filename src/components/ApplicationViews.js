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
import { ConnectedUserDetail } from "./connectedUsers/ConnectedUserDetail";
import { FeedProvider } from "./home/FeedProvider"
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
            <FeedProvider>
            <DashboardView />
            </FeedProvider>
          </Route>

          <ItemProvider>
            <Route exact path="/items">
              <ItemTable />
            </Route>
          </ItemProvider>

          <ItemProvider>
            <CategoryProvider>
              <FeedProvider>
              <LocationProvider>
              <Route exact path="/items/add">
                <ItemForm/>
              </Route>
              </LocationProvider>
              </FeedProvider>
            </CategoryProvider>
          </ItemProvider>

          <ItemProvider>
            <CategoryProvider>
              <FeedProvider>
              <LocationProvider>
            <Route exact path="/items/edit/:itemId(\d+)">
              <ItemForm/>
            </Route>
            </LocationProvider>
            </FeedProvider>
            </CategoryProvider>
          </ItemProvider>

        <LocationProvider>
          <Route exact path="/locations">
            <LocationTable />
          </Route>
        </LocationProvider>

        <LocationProvider>
          <FeedProvider>
          <Route exact path="/locations/add">
            <LocationForm />
          </Route>
          </FeedProvider>
        </LocationProvider>

        <LocationProvider>
          <Route exact path="/locations/edit/:locationId(\d+)">
            <LocationForm />
          </Route>
        </LocationProvider>


        <UserProvider>
          <LocationProvider>
          <Route exact path="/user/detail/:userId(\d+)">
            <ConnectedUserDetail />
          </Route>
          </LocationProvider>
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
  