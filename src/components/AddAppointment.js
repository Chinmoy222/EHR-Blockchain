import React, { useState } from "react";
import Card from "./Card";
import AppointmentForm from "./AppointmentForm";
import abi from "../storehash";
import web3 from "../web3";
import "./AddAppointment.css";
import "./AppointmentForm.css";
const AddAppointment = (props) => {
  const storehash = new web3.eth.Contract(abi, props.address);
  const [getAppointment, setGetAppointment] = useState([]);
  const [messageValue, setMessageValue] = useState("");
  const AddAppointmentHandler = async (enteredAppointmentData) => {
    const appointmentData = {
      ...enteredAppointmentData,
    };
    // props.onAddAppointment(appointmentData);
    console.log(appointmentData);
    setMessageValue("Transaction is being processed...");
    const accounts = await web3.eth.getAccounts();

    if (appointmentData.doctor && appointmentData.date) {
      const month = appointmentData.date.toLocaleString("en-US", { month: "long" });
      const day = appointmentData.date.toLocaleString("en-US", { day: "2-digit" });
      const year = appointmentData.date.getFullYear();
      appointmentData.date = day + "-" + month + "-" + year;
      await storehash.methods
        .createAppointment(appointmentData.doctor, appointmentData.date)
        .send({
          from: accounts[0],
        });
    }
    setMessageValue("Transaction Success");

    setMessageValue("Data Retrieving...");
    GetAppointmentHandler();
    setMessageValue("Retrieval Success");
  };

  const GetAppointmentHandler = async () => {
    setMessageValue("Retrieving Data...");
    setGetAppointment([]);
    const accounts = await web3.eth.getAccounts();
    const getAppointmentLen = await storehash.methods
      .getAppointmentLen()
      .call({
        from: accounts[0],
      });

    var i;
    for (i = 0; i < parseInt(getAppointmentLen); i++) {
      const item = await storehash.methods.getAppointment(i).call({
        from: accounts[0],
      });
      setGetAppointment((getAppointment) => [...getAppointment, item]);
    } 
    console.log(getAppointment)
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
    GetAppointmentHandler();
    console.log(props.address);
  };
  if (formCancelValue & viewCancelValue) {
    return (
      <div>
        <Card>
          <form>
            <div className="edit-medical">
              <button type="button" onClick={setFormHandler}>
                Add Appointment Data
              </button>
            </div>
          </form>
        </Card>
        <Card>
          <form>
            <div className="edit-patient">
              <button type="button" onClick={setViewHandler}>
                View Appointment Data
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
                Add Appointment Data
              </button>
            </div>
          </form>
        </Card>
        <Card>
          <form>
            <h3>Appointment History</h3>
            <li className="expenses-list">
              {getAppointment.map((Appointment) => (
                <div className="expense-item__description">
                  <p>{Appointment}</p>
                </div>
              ))}
            </li>
            <div className="edit-patient">
              <button type="button" onClick={resetViewHandler}>
                Hide Appointment Data
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
          <AppointmentForm
            onAddAppointmentData={AddAppointmentHandler}
            onCancelForm={resetFormHandler}
          />
        </Card>
        <Card>
          <form>
            <div className="edit-patient">
              <button type="button" onClick={setViewHandler}>
                View Appointment Data
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
        <AppointmentForm
          onAddAppointmentData={AddAppointmentHandler}
          onCancelForm={resetFormHandler}
        />
      </Card>
      <Card>
        <form>
          <h3>Appointment History</h3>
          <li className="expenses-list">
            {getAppointment.map((Appointment) => (
              <div className="expense-item__description">
                <p>{Appointment}</p>
              </div>
            ))}
          </li>

          
          <div className="edit-patient">
            <button type="button" onClick={resetViewHandler}>
              Hide Appointment Data
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

export default AddAppointment;
