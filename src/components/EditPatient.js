import React, { useState } from "react";
import Card from "./Card";
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
      <Card>
        <form>
          <div className="edit-patient">
            <button type="button" onClick={setFormHandler}>
              Edit Patient Data
            </button>
          </div>
        </form>
      </Card>
    );
  }
  return (
    <Card className="edit-patient">
      <PatientForm
        onEditPatientData={EditPatientHandler}
        onCancelForm={resetFormHandler}
      />
    </Card>
  );
};

export default EditPatient;
