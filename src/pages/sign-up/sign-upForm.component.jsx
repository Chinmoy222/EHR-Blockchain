import React, { useState } from "react";
import "./sign-up.styles.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
const SignUpPage = (props) => {
  const [address, setAddress] = useState("");
  // const [password, setPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredDOB, setEnteredDOB] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredZip, setEnteredZip] = useState("");
  const [enteredDistrict, setEnteredDistrict] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredState, setEnteredState] = useState("");
  const NameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const DOBChangeHandler = (event) => {
    setEnteredDOB(event.target.value);
  };

  const EmailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const PhoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
  };

  const AddressChangeHandler = (event) => {
    setEnteredAddress(event.target.value);
  };

  const ZipChangeHandler = (event) => {
    setEnteredZip(event.target.value);
  };

  const DistrictChangeHandler = (event) => {
    setEnteredDistrict(event.target.value);
  };

  const CityChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };

  const StateChangeHandler = (event) => {
    setEnteredState(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const patientData = {
      name: enteredName,
      dob: new Date(enteredDOB),
      email: enteredEmail,
      phone: enteredPhone,
      address: enteredAddress,
      zip: enteredZip,
      district: enteredDistrict,
      city: enteredCity,
      state: enteredState,
    };
    const month = patientData.dob.toLocaleString("en-US", { month: "long" });
    const day = patientData.dob.toLocaleString("en-US", { day: "2-digit" });
    const year = patientData.dob.getFullYear();
    patientData.dob = day + "-" + month + "-" + year;
    console.log(patientData);
    props.onSignUp(patientData);
  };

  return (
    <Form onSubmit={submitHandler}>
      <div className="edit-patient__controls">
        <div className="edit-patient__control">
          <label>Name</label>
          <input type="text" value={enteredName} onChange={NameChangeHandler} />
        </div>
        <div className="edit-patient__control">
          <label>Date of Birth</label>
          <input type="date" value={enteredDOB} onChange={DOBChangeHandler} />
        </div>
        <div className="edit-patient__control">
          <label>Email</label>
          <input
            type="email"
            value={enteredEmail}
            onChange={EmailChangeHandler}
          />
        </div>
        <div className="edit-patient__control">
          <label>Phone No.</label>
          <input
            type="tel"
            placeholder="10 Digit Phone Number"
            pattern="[0-9]{10}"
            value={enteredPhone}
            onChange={PhoneChangeHandler}
          />
        </div>
        <div className="edit-patient__control">
          <label>Address</label>
          <input
            type="text"
            value={enteredAddress}
            onChange={AddressChangeHandler}
          />
        </div>
        <div className="edit-patient__control">
          <label>ZIP Code</label>
          <input
            type="number"
            min="000001"
            max="999999"
            value={enteredZip}
            onChange={ZipChangeHandler}
          />
        </div>
        <div className="edit-patient__control">
          <label>District</label>
          <input
            type="text"
            value={enteredDistrict}
            onChange={DistrictChangeHandler}
          />
        </div>
        <div className="edit-patient__control">
          <label>City</label>
          <input type="text" value={enteredCity} onChange={CityChangeHandler} />
        </div>
        <div className="edit-patient__control">
          <label>State</label>
          <input
            type="text"
            value={enteredState}
            onChange={StateChangeHandler}
          />
        </div>
      </div>
      <Button
        type="submit"
        className="btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
      >
        Sign Up
      </Button>
    </Form>
  );
};
export default SignUpPage;