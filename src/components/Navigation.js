
import React from 'react';
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';
import { BrowserRouter, Route } from "react-router-dom";
function Navigation (){
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Electronic Health Record</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">About</Nav.Link>
            <Nav.Link href="#pricing">Team Members</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link Link to="/patientEdit">
              Personal Details
            </Nav.Link>
            <NavDropdown title="Sign Up As" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Doctor</NavDropdown.Item>
              <NavDropdown.Item>Patient</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
 
}

export default Navigation;