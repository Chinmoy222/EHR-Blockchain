import React, { Fragment, useState } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import  Navigation from './components/Navigation'; 
import EditPatient from "./components/EditPatient"; 
import AddMedical from "./components/AddMedical";
import LoginPage from "./pages/sign-in/sign-in.component";

function App() {
  const address = "0xc3a4858a08E5d107D85723fc7728eE9C4EdF8cB3";
  const [addressValue, setAddressValue] = useState("");
  setAddressValue(address);
  const changeAddressHandler = (enteredAddress) => {
    setAddressValue(enteredAddress);
    console.log("App=>"+addressValue);
  };
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <Route exact path="/" component={Navigation} />
      <Route
        exact
        path="/login"
        render={(props) => (
          <Fragment>
            <Navigation /> <LoginPage addressChanger={changeAddressHandler} />
          </Fragment>
        )}
      />
      <Route
        exact
        path="/patientEdit"
        render={(props) => (
          <Fragment>
            <Navigation /> <EditPatient address={addressValue} />
          </Fragment>
        )}
      />
      <Route
        exact
        path="/doctorEdit"
        render={(props) => (
          <Fragment>
            <Navigation /> <AddMedical address={addressValue} />
          </Fragment>
        )}
      />
    </BrowserRouter>
  );
}

export default App;
