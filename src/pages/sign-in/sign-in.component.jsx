import React, { useState } from "react";
import "./sign-in.styles.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const LoginPage = (props) => {
  const [address, setAddress] = useState("");
  // const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.addressChanger(address);
    console.log(address);
  };

  return (
    <Container fluid>
      <Row no-gutter>
        <Col className="col-md-6 d-none d-md-flex bg-image"></Col>
        <Col className="col-md-6 bg-light">
          <div className="login d-flex align-items-center py-5">
            <Container>
              <Row>
                <Col className="col-lg-10 col-xl-7 mx-auto">
                  <h5 className="display-5 heading">LOGIN</h5>
                  <br />
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        id="inputEmail"
                        type="text"
                        placeholder="Contract Address"
                        required=""
                        autofocus=""
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="rounded-pill border-0 shadow-sm px-4"
                      />
                    </Form.Group>
                    {/* <Form.Group className="mb-3">
                      <Form.Control
                        id="inputPassword"
                        type="password"
                        placeholder="Password"
                        required=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-pill border-0 shadow-sm px-4 text-primary"
                      />
                    </Form.Group> */}
                    <Button
                      type="submit"
                      className="btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                    >
                      Sign in
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
