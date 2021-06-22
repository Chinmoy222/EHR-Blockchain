import React, { useState } from "react";
import "./AppointmentForm.css";
import Card from "./Card";
const AppointmentForm = (props) => {
  const [enteredDoctor, setEnteredDoctor] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const DoctorChangeHandler = (event) => {
    setEnteredDoctor(event.target.value);
  };

  const DateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };


  const submitHandler = (event) => {
    event.preventDefault();

    const appointmentData = {
      doctor: enteredDoctor,
      date: new Date(enteredDate)
    };

    props.onAddAppointmentData(appointmentData);
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className="edit-medical__controls">
          <div className="edit-medical__control">
            <label>Doctor</label>
            <input
              type="text"
              value={enteredDoctor}
              onChange={DoctorChangeHandler}
            />
          </div>
          <div className="edit-medical__control">
            <label>Date</label>
            <input
              type="date"
              value={enteredDate}
              onChange={DateChangeHandler}
            />
          </div>
        </div>
        <div className="edit-medical__actions">
          <button type="button" onClick={props.onCancelForm}>
            Cancel
          </button>
          <button type="submit">Add Appointment</button>
        </div>
      </form>
    </Card>
  );
};

export default AppointmentForm;