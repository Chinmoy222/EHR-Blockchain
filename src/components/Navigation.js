
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
            <Nav.Link href="/appointment">Appointments</Nav.Link>
            <Nav.Link href="/patientEdit">Personal Details</Nav.Link>
            <Nav.Link href="/doctorEdit">Medical Details</Nav.Link>
            <NavDropdown title="Registration" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/login">Contract Login</NavDropdown.Item>
              <NavDropdown.Item href="/signup">Patient Sign Up</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
 
}

export default Navigation;