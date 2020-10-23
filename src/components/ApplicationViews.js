import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./home/Home";
import {ItemProvider} from "./items/ItemProvider";
import { LocationProvider } from "./locations/LocationProvider";
import {LocationTable} from "./locations/LocationTable";
import { LocationForm } from "./locations/LocationForm";
import {ItemTable} from "./items/ItemTable"
import {ItemForm} from "./items/ItemForm"
import { CategoryProvider } from "./categories/CategoryProvider";

export const ApplicationViews = (props) => {
    return (
      <>
      <section className="pageContent">
        {/* Render the location list when http://localhost:3000/ */}
          <Route exact path="/">
            <Home />
          </Route>

          <ItemProvider>
            <Route exact path="/items">
              <ItemTable />
            </Route>
          </ItemProvider>

          <ItemProvider>
            <CategoryProvider>
              <Route exact path="/items/add">
                <ItemForm/>
              </Route>
            </CategoryProvider>
          </ItemProvider>

          <ItemProvider>
            <CategoryProvider>
            <Route exact path="/items/edit/:itemId(\d+)">
              <ItemForm/>
            </Route>
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


        </section>
      </>
    );
  };
  