import React, { useState } from "react";
import ipfs from "./ipfs";
import web3 from "../web3";
import abi from "../storehash";


import { Container, Form, Button, Row, Col } from "react-bootstrap";

const MRUpload = (props) => {
  const [fileName, setFileName] = useState("Choose File");
  const [ipfsHashValue, setIpfsHash] = useState(null);
  const [buffer, setBuffer] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [txReceipt, setTxReceipt] = useState("");

  const storehash = new web3.eth.Contract(abi, props.address);
  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    setFileName(file.name);
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader);
  };

  const convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    setBuffer(buffer);
  };

  const onClickMR = async () => {
    try {
      // this.setState({ blockNumber: "waiting.." });
      // this.setState({ gasUsed: "waiting..." });
      await web3.eth.getTransactionReceipt(
        transactionHash,
        (err, txReceipt) => {
          console.log(err, txReceipt);
          setTxReceipt(txReceipt);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitMR = async (event) => {
    // console.log(event);
    event.preventDefault();
    const accounts = await web3.eth.getAccounts(); //obtain contract address from storehash.js
    const ethAddress = await storehash.options.address;
    setEthAddress(ethAddress);
    // console.log(props.address+'---'+ethAddress);
    //save document to IPFS,return its hash#, and set hash# to state
    await ipfs.add(buffer, async (err, ipfsHash) => {
      console.log(err, ipfsHash, ipfsHash[0].hash);      
      //setState by setting ipfsHash to ipfsHash[0].hash
      await setIpfsHash(ipfsHash[0].hash);
      // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
      //return the transaction hash from the ethereum contract
      await storehash.methods.setHashMedicalReports(ipfsHashValue).send(
        {
          from: accounts[0],
        },
        (error, transactionHash) => {
          console.log(transactionHash);
          setTransactionHash(transactionHash);
        }
      );
    });
    
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={onSubmitMR}>
            <Form.Label>Upload Medical Report</Form.Label>
            <Form.File
              label={fileName}
              custom
              onChange={captureFile}
            ></Form.File>
            <hr/>
            <Button type="submit" variant="primary">
            Submit
          </Button>
          <hr/>
          </Form>
          
        </Col>
        <Container className="justify-content-center">
          <table bordered responsive>
            <thead>
              <tr>
                <th>Tx Receipt Category</th>
                <th> </th>
                <th>Values</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              <tr>
                {" "}
                <td>IPFS Hash stored on Ethereum</td> <td> : </td>{" "}
                <td>{ipfsHashValue}</td>{" "}
              </tr>{" "}
              <tr>
                {" "}
                <td>Ethereum Contract Address</td> <td> : </td>{" "}
                <td>{ethAddress}</td>{" "}
              </tr>{" "}
              <tr>
                {" "}
                <td>Transaction Hash </td> <td> : </td>{" "}
                <td>{transactionHash}</td>{" "}
              </tr>{" "}
            </tbody>{" "}
          </table>{" "}
          <hr/>
          <Button onClick={onClickMR}> Get Transaction Receipt </Button>
          
        </Container>

      </Row>
    </Container>
  );
};

export default MRUpload;
