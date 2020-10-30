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
import { ActivityProvider } from "./home/ActivityProvider"
import { ConnectionProvider } from './connectedUsers/ConnectionProvider';
import {ConnectionList} from './connectedUsers/ConnectionList'
import { ConnectionSearch } from './connectedUsers/ConnectionSearch'
import { ListsPlaceholder } from './lists/ListsPlaceholder'
import { MyAccountPlaceholder } from './account/MyAccountPlaceholder'

export const ApplicationViews = (props) => {
    return (
      <>
      <section className="pageContent">
        {/* Render the location list when http://localhost:3000/ */}
        <Route exact path="/home">
            <Home />
          </Route>

          <Route exact path="/lists">
            <ListsPlaceholder />
          </Route>

          <Route exact path="/account">
            <MyAccountPlaceholder />
          </Route>
          
          <Route exact path="/">
            <ActivityProvider>
              <DashboardView />
            </ActivityProvider>
          </Route>

          <ItemProvider>
            <Route exact path="/items">
              <ItemTable />
            </Route>
          </ItemProvider>

          <ItemProvider>
            <CategoryProvider>
              <ActivityProvider>
                <LocationProvider>
                  <Route exact path="/items/add">
                    <ItemForm/>
                  </Route>
                </LocationProvider>
              </ActivityProvider>
            </CategoryProvider>
          </ItemProvider>

          <ItemProvider>
            <CategoryProvider>
              <ActivityProvider>
                <LocationProvider>
                  <Route exact path="/items/edit/:itemId(\d+)">
                    <ItemForm/>
                  </Route>
                </LocationProvider>
              </ActivityProvider>
            </CategoryProvider>
          </ItemProvider>

        <LocationProvider>
          <Route exact path="/locations">
            <LocationTable />
          </Route>
        </LocationProvider>

        <LocationProvider>
          <ActivityProvider>
            <ItemProvider>
              <Route exact path="/locations/add">
                <LocationForm />
              </Route>
            </ItemProvider>
          </ActivityProvider>
        </LocationProvider>

        <LocationProvider>
          <ActivityProvider>
            <ItemProvider>
            <Route exact path="/locations/edit/:locationId(\d+)">
              <LocationForm />
            </Route>
            </ItemProvider>
          </ActivityProvider>
        </LocationProvider>


        <UserProvider>
          <LocationProvider>
            <ActivityProvider>
              <Route exact path="/user/detail/:userId(\d+)">
                <ConnectedUserDetail />
              </Route>
            </ActivityProvider>
          </LocationProvider>
        </UserProvider>

        < UserProvider>
          <ConnectionProvider>
            <ActivityProvider>
              <Route exact path="/users">
                  <ConnectionSearch />
                  <ConnectionList />
              </Route>
              </ActivityProvider>
          </ConnectionProvider>
        </UserProvider>


        </section>
      </>
    );
  };
  