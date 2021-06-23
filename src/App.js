import React, { Fragment, useState } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import  Navigation from './components/Navigation'; 
import EditPatient from "./components/EditPatient"; 
import AddMedical from "./components/AddMedical";
import ViewIPFS from "./components/ViewIPFS";
import LoginPage from "./pages/sign-in/sign-in.component";
import SignUpPage from "./pages/sign-up/sign-up.component";
import Card from "./components/Card";
import MRUpload from "./components/mr-upload.component";
import PRUpload from "./components/pr-upload.component";
import AddAppointment from './components/AddAppointment';
function App() {
  // const address = "0x0F658b1A03be1B2Fb42Fda68B0D150CbB7709599";
  const [addressValue, setAddressValue] = useState(window.sessionStorage.getItem("addressValue"));
  // setAddressValue(address);
  const changeAddressHandler = async (enteredAddress) => {
    await setAddressValue(enteredAddress);
    await window.sessionStorage.setItem("addressValue", addressValue);
    console.log(
      "App=>" +
        addressValue +
        " --- " +
        await window.sessionStorage.getItem("addressValue")
    );
    
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
        path="/signup"
        render={(props) => (
          <Fragment>
            <Navigation /> <SignUpPage addressChanger={changeAddressHandler} />
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
            <Card>
              <MRUpload address={addressValue} />
            </Card>
            <Card>
              <PRUpload address={addressValue} />
            </Card>
            <Card>
              <ViewIPFS address={addressValue} />
            </Card>
          </Fragment>
        )}
      />
      <Route
        exact
        path="/appointment"
        render={(props) => (
          <Fragment>
            <Navigation />
            <Card>
              <AddAppointment address={addressValue} />
            </Card>
          </Fragment>
        )}
      />
    </BrowserRouter>
  );
}

export default App;
