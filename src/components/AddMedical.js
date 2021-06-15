import React, { useState } from "react";
import Card from "./Card";
import DoctorForm from "./DoctorForm";
import "./AddMedical.css";
import "./DoctorForm.css";
const AddMedical = (props) => {
  const AddMedicalHandler = (enteredMedicalData) => {
    const medicalData = {
      ...enteredMedicalData
    };
    // props.onAddMedical(medicalData);
    console.log(medicalData);
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
          <div className="edit-medical">
            <button type="button" onClick={setFormHandler}>
              Add Medical Data
            </button>
          </div>
        </form>
      </Card>
    );
  }
  return (
    <Card className="edit-medical">
      <DoctorForm
        onAddMedicalData={AddMedicalHandler}
        onCancelForm={resetFormHandler}
      />
    </Card>
  );
};

export default AddMedical;
