import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./home/Home";
import {ItemProvider} from "./items/ItemProvider";
import {ItemTable} from "./items/ItemTable"
import {ItemForm} from "./items/ItemForm"

export const ApplicationViews = (props) => {
    return (
      <>
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
          <Route exact path="/items/add">
            <ItemForm/>
          </Route>
        </ItemProvider>

        <ItemProvider>
          <Route exact path="/items/edit/:itemId(\d+)">
            <ItemForm/>
          </Route>
        </ItemProvider>
  
      </>
    );
  };
  