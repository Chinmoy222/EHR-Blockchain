import React, { useState } from "react";
import Card from "./Card";
import abi from "../storehash";
import web3 from "../web3";
import "./ViewIPFS.css";
const ViewIPFS = (props) => {
  const storehash = new web3.eth.Contract(abi, props.address);
  const [getMR, setGetMR] = useState([]);
  const [getPR, setGetPR] = useState([]);
  const [messageValue, setMessageValue] = useState("");

  const GetMedicalHandler = async () => {
    setMessageValue("Retrieving Data...");
    setGetMR([]);
    setGetPR([]);
    const accounts = await web3.eth.getAccounts();
    const getPRLen = await storehash.methods.getHashSizeipfsHashPrescription().call({
      from: accounts[0],
    });
    const getMRLen = await storehash.methods.getHashSizeMedicalReports().call({
      from: accounts[0],
    });

    var i;
    for (i = 0; i < parseInt(getMRLen); i++) {
      const item = await storehash.methods.getHashMedicalReports(i).call({
        from: accounts[0],
      });
      setGetMR((getMR) => [...getMR, item.toString()]);
    }
    for (i = 0; i < parseInt(getPRLen); i++) {
      const item = await storehash.methods.getHashipfsHashPrescription(i).call({
        from: accounts[0],
      });
      setGetPR((getPR) => [...getPR, item.toString()]);
      console.log("PR=>" + item);
    }
    console.log(getMR, getPR);
    setMessageValue("Data Retrieved");

    setMessageValue("");
  };

  const [MRCancelValue, setMRCancelValue] = useState(true);
  const resetMRHandler = () => {
    setMRCancelValue(true);
  };

  const setMRHandler = () => {
    setMRCancelValue(false);
    GetMedicalHandler();
  };

  const [PRCancelValue, setPRCancelValue] = useState(true);
  const resetPRHandler = () => {
    setPRCancelValue(true);
  };

  const setPRHandler = () => {
    setPRCancelValue(false);
    GetMedicalHandler();
  };
  if (MRCancelValue & PRCancelValue) {
    return (
      <div>
        <Card>
          <form>
            <div className="edit-medical">
              <button type="button" onClick={setMRHandler}>
                View Medical Reports
              </button>
            </div>
          </form>
        </Card>
        <Card>
          <form>
            <div className="edit-patient">
              <button type="button" onClick={setPRHandler}>
                View Prescriptions
              </button>
            </div>
          </form>
          <center>
            <h3>{messageValue}</h3>
          </center>
        </Card>
      </div>
    );
  } else if (MRCancelValue & !PRCancelValue) {
    return (
      <div>
        <Card>
          <form>
            <div className="edit-medical">
              <button type="button" onClick={setMRHandler}>
                View Medical Reports
              </button>
            </div>
          </form>
        </Card>
        <Card>
          <form>
            <h3>PR</h3>
            <ul className="expenses-list">
              {getPR.map((PR) => (
                <div className="expense-item__description">
                  <li><a href={"https://gateway.ipfs.io/ipfs/"+PR}>{PR}</a></li>
                </div>
              ))}
            </ul>
            <div className="edit-patient">
              <button type="button" onClick={resetPRHandler}>
                Hide Prescriptions
              </button>
            </div>
          </form>
          <center>
            <h3>{messageValue}</h3>
          </center>
        </Card>
      </div>
    );
  } else if (!MRCancelValue & PRCancelValue) {
    return (
      <div>
        <Card className="edit-medical">
          <h3>Medical History</h3>
          <ul className="expenses-list">
            {getMR.map((MR) => (
              <div className="expense-item__description">
                <li>
                  <a href={"https://gateway.ipfs.io/ipfs/" + MR}>{MR}</a>
                </li>
              </div>
            ))}
          </ul>
          <div className="edit-patient">
            <button type="button" onClick={resetMRHandler}>
              Hide Medical Reports
            </button>
          </div>
        </Card>
        <Card>
          <form>
            <div className="edit-patient">
              <button type="button" onClick={setPRHandler}>
                View Prescriptions
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
        <h3>Medical Records</h3>
        <ul className="expenses-list">
          {getMR.map((MR) => (
            <div className="expense-item__description">
              <li>
                <a href={"https://gateway.ipfs.io/ipfs/" + MR}>{MR}</a>
              </li>
            </div>
          ))}
        </ul>
        <div className="edit-patient">
          <button type="button" onClick={resetMRHandler}>
            Hide Medical Reports
          </button>
        </div>
      </Card>
      <Card>
        <form>
          <h3>Prescriptions</h3>
          <ul className="expenses-list">
            {getPR.map((PR) => (
              <div className="expense-item__description">
                <li>
                  <a href={"https://gateway.ipfs.io/ipfs/" + PR}>{PR}</a>
                </li>
              </div>
            ))}
          </ul>
          <div className="edit-patient">
            <button type="button" onClick={resetPRHandler}>
              Hide Prescriptions
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

export default ViewIPFS;
