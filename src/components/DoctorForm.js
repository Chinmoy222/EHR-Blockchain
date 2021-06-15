import React, { useState } from "react";
import "./DoctorForm.css";
import Card from "./Card";
const DoctorForm = (props) => {
  const [enteredMH, setEnteredMH] = useState("");
  const [enteredDiagnosis, setEnteredDiagnosis] = useState("");

  const MHChangeHandler = (event) => {
    setEnteredMH(event.target.value);
  };

  const DiagnosisChangeHandler = (event) => {
    setEnteredDiagnosis(event.target.value);
  };


  const submitHandler = (event) => {
    event.preventDefault();

    const medicalData = {
      mh: enteredMH,
      diagnosis: enteredDiagnosis
    };

    props.onAddMedicalData(medicalData);
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className="edit-medical__controls">
          <div className="edit-medical__control">
            <label>Add Medical History</label>
            <input type="text" value={enteredMH} onChange={MHChangeHandler} />
          </div>
          <div className="edit-medical__control">
            <label>Add Diagnosis</label>
            <input
              type="text"
              value={enteredDiagnosis}
              onChange={DiagnosisChangeHandler}
            />
          </div>
        </div>
        <div className="edit-medical__actions">
          <button type="button" onClick={props.onCancelForm}>
            Cancel
          </button>
          <button type="submit">Edit Medical Details</button>
        </div>
      </form>
    </Card>
  );
};

export default DoctorForm;