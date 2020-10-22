import React from "react";
import logo from "../../images/Logo.png";
import "../TotellyOrganized.css"

export const Home = () => (
  <div className="text-center mt-5" class="pageContent">
    <img src={logo} alt="totelly organized logo"/>
    <h1 className="display-3" style={{ color: "#def2f1" }}>
      Welcome
    </h1>
    <small>Front End Capstone Project - Nashville Software School - November 2020</small>

    <address>
      <div>Created By: Ember Parr</div>
      <div>ember@emberparr.com</div>
    </address>
  </div>
);