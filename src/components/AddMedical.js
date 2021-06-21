import React, { useState } from "react";
import Card from "./Card";
import DoctorForm from "./DoctorForm";
import abi from "../storehash";
import web3 from "../web3";
import "./AddMedical.css";
import "./DoctorForm.css";
const AddMedical = (props) => {
  const storehash = new web3.eth.Contract(abi, props.address);
  const [getMH, setGetMH] = useState([]);
  const [getDiagnosis, setGetDiagnosis] = useState([]);
  const [messageValue, setMessageValue] = useState("");
  const AddMedicalHandler = async (enteredMedicalData) => {
    const medicalData = {
      ...enteredMedicalData,
    };
    // props.onAddMedical(medicalData);
    console.log(medicalData);
    setMessageValue("Transaction is being processed...");
    const accounts = await web3.eth.getAccounts();

    if (medicalData.mh) {
      await storehash.methods.addMedicalHistory(medicalData.mh).send({
        from: accounts[0],
      });
    }

    if (medicalData.diagnosis) {
      await storehash.methods.addDiagnosis(medicalData.diagnosis).send({
        from: accounts[0],
      });
    }

    setMessageValue("Transaction Success");

    setMessageValue("Data Retrieving...");
    GetMedicalHandler();
    setMessageValue("Retrieval Success");
  };

  const GetMedicalHandler = async () => {
    setMessageValue("Retrieving Data...");
    setGetMH([]);
    setGetDiagnosis([]);
    const accounts = await web3.eth.getAccounts();
    const getDiagnosisLen = await storehash.methods.getDiagnosisLen().call({
      from: accounts[0],
    });
    const getMedicalHistoryLen = await storehash.methods
      .getMedicalHistoryLen()
      .call({
        from: accounts[0],
      });

    var i;
    for (i = 0; i < parseInt(getMedicalHistoryLen); i++) {
      const item = await storehash.methods.getMedicalHistory(i).call({
          from: accounts[0],
        });
      setGetMH((getMH) => [
        ...getMH,
        item
      ]);
    } 
    for (i = 0; i < parseInt(getDiagnosisLen); i++) {
      const item = await storehash.methods.getDiagnosis(i).call({
          from: accounts[0],
        });
      setGetDiagnosis((getDiagnosis) => [
        ...getDiagnosis,
        item
      ]);
    }
    console.log(getMH, getDiagnosis)
    setMessageValue("Data Retrieved");
  };

  const [formCancelValue, setFormCancelValue] = useState(true);
  const resetFormHandler = () => {
    setFormCancelValue(true);
  };

  const setFormHandler = () => {
    setFormCancelValue(false);
  };

  const [viewCancelValue, setViewCancelValue] = useState(true);
  const resetViewHandler = () => {
    setViewCancelValue(true);
  };

  const setViewHandler = () => {
    setViewCancelValue(false);
    GetMedicalHandler();
  };
  if (formCancelValue & viewCancelValue) {
    return (
      <div>
        <Card>
          <form>
            <div className="edit-medical">
              <button type="button" onClick={setFormHandler}>
                Add Medical Data
              </button>
            </div>
          </form>
        </Card>
        <Card>
          <form>
            <div className="edit-patient">
              <button type="button" onClick={setViewHandler}>
                View Medical Data
              </button>
            </div>
          </form>
          <center>
            <h3>{messageValue}</h3>
          </center>
        </Card>
      </div>
    );
  }
  else if(formCancelValue & !viewCancelValue){
    return (
      <div>
        <Card>
          <form>
            <div className="edit-medical">
              <button type="button" onClick={setFormHandler}>
                Add Medical Data
              </button>
            </div>
          </form>
        </Card>
        <Card>
          <form>
            <h3>Medical History</h3>
            <li className="expenses-list">
              {getMH.map((MH) => (
                <div className="expense-item__description">
                  <p>{MH}</p>
                </div>
              ))}
            </li>

            <h3>Diagnosis</h3>
            <li className="expenses-list">
              {getDiagnosis.map((Diagnosis) => (
                <div className="expense-item__description">
                  <p>{Diagnosis}</p>
                </div>
              ))}
            </li>
            <div className="edit-patient">
              <button type="button" onClick={resetViewHandler}>
                Hide Medical Data
              </button>
            </div>
          </form>
          <center>
            <h3>{messageValue}</h3>
          </center>
        </Card>
      </div>
    );
  }
  else if (!formCancelValue & viewCancelValue) {
    return (
      <div>
        <Card className="edit-medical">
          <DoctorForm
            onAddMedicalData={AddMedicalHandler}
            onCancelForm={resetFormHandler}
          />
        </Card>
        <Card>
          <form>
            <div className="edit-patient">
              <button type="button" onClick={setViewHandler}>
                View Medical Data
              </button>
            </div>
          </form>
          <center>
            <h3>{messageValue}</h3>
          </center>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <Card className="edit-medical">
        <DoctorForm
          onAddMedicalData={AddMedicalHandler}
          onCancelForm={resetFormHandler}
        />
      </Card>
      <Card>
        <form>
          <h3>Medical History</h3>
          <li className="expenses-list">
            {getMH.map((MH) => (
              <div className="expense-item__description">
                <p>{MH}</p>
              </div>
            ))}
          </li>

          <h3>Diagnosis</h3>
          <li className="expenses-list">
            {getDiagnosis.map((Diagnosis) => (
              <div className="expense-item__description">
                <p>{Diagnosis}</p>
              </div>
            ))}
          </li>
          <div className="edit-patient">
            <button type="button" onClick={resetViewHandler}>
              Hide Medical Data
            </button>
          </div>
        </form>
        <center>
          <h3>{messageValue}</h3>
        </center>
      </Card>
    </div>
  );
};

export default AddMedical;
