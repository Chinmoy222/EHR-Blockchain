import React, { useState } from "react";

import PatientForm from "./PatientForm";
import "./EditPatient.css";
import "./PatientForm.css";
const EditPatient = (props) => {
  const EditPatientHandler = (enteredPatientData) => {
    const patientData = {
      ...enteredPatientData
    };
    // props.onEditPatient(patientData);
    console.log(patientData);
  };

  const [formCancelValue, setFormCancelValue] = useState(true);
  const resetFormHandler = () => {
    setFormCancelValue(true);
  };

  const setFormHandler = () => {
    setFormCancelValue(false);
  };

  if (formCancelValue) {
    return (
      <form>
        <div className="edit-patient">
          <button type="button" onClick={setFormHandler}>
            Edit Patient Data
          </button>
        </div>
      </form>
    );
  }
  return (
    <div className="edit-patient">
      <PatientForm
        onEditPatientData={EditPatientHandler}
        onCancelForm={resetFormHandler}
      />
    </div>
  );
};

export default EditPatient;