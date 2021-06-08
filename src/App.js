import React, { Fragment } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import  Navigation from './components/Navigation'; 
import EditPatient from "./components/EditPatient"; 
import AddMedical from "./components/AddMedical"; 

function App() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <Route exact path="/" component={Navigation} />
      <Route
        exact
        path="/patientEdit"
        render={(props) => (
          <Fragment>
            <Navigation /> <EditPatient />
          </Fragment>
        )}
      />
      <Route
        exact
        path="/doctorEdit"
        render={(props) => (
          <Fragment>
            <Navigation /> <AddMedical />
          </Fragment>
        )}
      />
    </BrowserRouter>
  );
}

export default App;
