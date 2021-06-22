import React, { useState } from "react";
import Card from "./Card";
import PatientForm from "./PatientForm";
import abi from "../storehash";
import web3 from "../web3";
import "./EditPatient.css";
import "./PatientForm.css";

const EditPatient = (props) => {
  const storehash = new web3.eth.Contract(abi, props.address);
  const [getName, setGetName] = useState("");
  const [getDOB, setGetDOB] = useState("");
  const [getEmail, setGetEmail] = useState("");
  const [getPhone, setGetPhone] = useState("");
  const [getAddress, setGetAddress] = useState("");
  const [getZip, setGetZip] = useState("");
  const [getDistrict, setGetDistrict] = useState("");
  const [getCity, setGetCity] = useState("");
  const [getState, setGetState] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const EditPatientHandler = async (enteredPatientData) => {
    const patientData = {
      ...enteredPatientData,
    };
    
    console.log(patientData);
    setMessageValue("Transaction is being processed...");
    const accounts = await web3.eth.getAccounts();

    if (patientData.name) {
      await storehash.methods.setName(patientData.name).send({
        from: accounts[0],
      });
    }

    if (patientData.dob) {
      const month = patientData.dob.toLocaleString("en-US", { month: "long" });
      const day = patientData.dob.toLocaleString("en-US", { day: "2-digit" });
      const year = patientData.dob.getFullYear();
      patientData.dob = day+'-'+month+'-'+year;
      await storehash.methods.setDOB(patientData.dob).send({
        from: accounts[0],
      });
    }
    if (patientData.email) {
      await storehash.methods.setEmail(patientData.email).send({
        from: accounts[0],
      });
    }

    if (patientData.phone) {
      await storehash.methods.setPhone(patientData.phone).send({
        from: accounts[0],
      });
    }

    if (patientData.address) {
      await storehash.methods.setResAddress(patientData.address).send({
        from: accounts[0],
      });
    }

    if (patientData.zip) {
      await storehash.methods.setZip(patientData.zip).send({
        from: accounts[0],
      });
    }

    if (patientData.district) {
      await storehash.methods.setDistrict(patientData.district).send({
        from: accounts[0],
      });
    }

    if (patientData.city) {
      await storehash.methods.setCity(patientData.city).send({
        from: accounts[0],
      });
    }
    if (patientData.state) {
      await storehash.methods.setState(patientData.state).send({
        from: accounts[0],
      });
    }

    setMessageValue("Transaction Success");

    setMessageValue("Data Retrieving...");
    GetPatientHandler();
    setMessageValue("Retrieval Success");
  };

  

  

  const GetPatientHandler = async () => {
      setMessageValue("Retrieving Data...");
      const accounts = await web3.eth.getAccounts();

      setGetName(
        await storehash.methods.getName().call({
          from: accounts[0],
        })
      );

      setGetDOB(
        await storehash.methods.getDOB().call({
          from: accounts[0],
        })
      );

      setGetEmail(
        await storehash.methods.getEmail().call({
          from: accounts[0],
        })
      );

      setGetPhone(
        await storehash.methods.getPhone().call({
          from: accounts[0],
        })
      );

      setGetAddress(
        await storehash.methods.getResAddress().call({
          from: accounts[0],
        })
      );

      setGetZip(
        await storehash.methods.getZip().call({
          from: accounts[0],
        })
      );

      setGetDistrict(
        await storehash.methods.getDistrict().call({
          from: accounts[0],
        })
      );

      setGetCity(
        await storehash.methods.getCity().call({
          from: accounts[0],
        })
      );

      setGetState(
        await storehash.methods.getState().call({
          from: accounts[0],
        })
      );

      setMessageValue("Data Retrieved");
    
  };
  const [formCancelValue, setFormCancelValue] = useState(true);
  const [viewCancelValue, setViewCancelValue] = useState(true);
  const resetFormHandler = () => {
    setFormCancelValue(true);
  };

  const setFormHandler = () => {
    setFormCancelValue(false);
  };

  const resetViewHandler = () => {
    setViewCancelValue(true);
  };

  const setViewHandler = () => {
    setViewCancelValue(false);
    GetPatientHandler();
  };
  if (formCancelValue & viewCancelValue) {
    return (
      <div>
        <Card>
          <form>
            <div className="edit-patient">
              <button type="button" onClick={setFormHandler}>
                Edit Personal Data
              </button>
            </div>
          </form>
        </Card>
        <Card>
          <form>
            <div className="edit-patient">
              <button type="button" onClick={setViewHandler}>
                View Personal Data
              </button>
            </div>
          </form>
        </Card>
      </div>
    );
  } else if (formCancelValue & !viewCancelValue) {
    return (
      <div>
        <Card>
          <form>
            <div className="edit-patient">
              <button type="button" onClick={setFormHandler}>
                Edit Personal Data
              </button>
            </div>
          </form>
        </Card>
        <Card>
          <form>
            <div className="edit-patient__controls">
              <div className="edit-patient__control">
                <label>Name</label>
                <input type="text" readonly value={getName} />
              </div>
              <div className="edit-patient__control">
                <label>Date of Birth</label>
                <input type="text" readonly value={getDOB} />
              </div>
              <div className="edit-patient__control">
                <label>Email</label>
                <input type="email" readonly value={getEmail} />
              </div>
              <div className="edit-patient__control">
                <label>Phone No.</label>
                <input type="text" readonly value={getPhone} />
              </div>
              <div className="edit-patient__control">
                <label>Address</label>
                <input type="text" readonly value={getAddress} />
              </div>
              <div className="edit-patient__control">
                <label>ZIP Code</label>
                <input type="text" readonly value={getZip} />
              </div>
              <div className="edit-patient__control">
                <label>District</label>
                <input type="text" readonly value={getDistrict} />
              </div>
              <div className="edit-patient__control">
                <label>City</label>
                <input type="text" readonly value={getCity} />
              </div>
              <div className="edit-patient__control">
                <label>State</label>
                <input type="text" readonly value={getState} />
              </div>
            </div>
            <center>
              <div className="edit-patient">
                <button type="button" onClick={resetViewHandler}>
                  Hide Personal Data
                </button>
              </div>
            </center>
          </form>
        </Card>
      </div>
    );
  } else if (!formCancelValue & viewCancelValue) {
    return (
      <div>
        <Card className="edit-patient">
          <PatientForm
            onEditPatientData={EditPatientHandler}
            onCancelForm={resetFormHandler}
          />
          <center>
            <h1>{messageValue}</h1>
          </center>
        </Card>
        <Card>
          <form>
            <div className="edit-patient">
              <button type="button" onClick={setViewHandler}>
                View Personal Data
              </button>
            </div>
          </form>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <Card className="edit-patient">
        <PatientForm
          onEditPatientData={EditPatientHandler}
          onCancelForm={resetFormHandler}
        />
        <center>
          <h1>{messageValue}</h1>
        </center>
      </Card>
      <Card>
        <form>
          <div className="edit-patient__controls">
            <div className="edit-patient__control">
              <label>Name</label>
              <input type="text" readonly value={getName} />
            </div>
            <div className="edit-patient__control">
              <label>Date of Birth</label>
              <input type="text" readonly value={getDOB} />
            </div>
            <div className="edit-patient__control">
              <label>Email</label>
              <input type="email" readonly value={getEmail} />
            </div>
            <div className="edit-patient__control">
              <label>Phone No.</label>
              <input type="text" readonly value={getPhone} />
            </div>
            <div className="edit-patient__control">
              <label>Address</label>
              <input type="text" readonly value={getAddress} />
            </div>
            <div className="edit-patient__control">
              <label>ZIP Code</label>
              <input type="text" readonly value={getZip} />
            </div>
            <div className="edit-patient__control">
              <label>District</label>
              <input type="text" readonly value={getDistrict} />
            </div>
            <div className="edit-patient__control">
              <label>City</label>
              <input type="text" readonly value={getCity} />
            </div>
            <div className="edit-patient__control">
              <label>State</label>
              <input type="text" readonly value={getState} />
            </div>
          </div>
          <div className="edit-patient">
            <button type="button" onClick={resetViewHandler}>
              Hide Personal Data
            </button>
          </div>
        </form>
      </Card>
      {/* <Card className="edit-patient">
        <PatientView items={getPatientData} />
        <center>
          <h1>{messageValue}</h1>
        </center>
      </Card> */}
    </div>
  );
};

export default EditPatient;
