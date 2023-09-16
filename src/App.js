import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        COSMO <br></br>  Our cosmic-calender app : Be updated about cosmic events around you... <br></br> ~Team CosmoX <br></br>____________
      </div>
    </React.Fragment>
  );
}

export default App;
