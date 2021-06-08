
import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import  Navigation from './components/Navigation'; 

function App() {
  return (
    <BrowserRouter>
        {/* <Header/> */}
      <Route exact path="/" component={Navigation} /> 
    </BrowserRouter>
  );
}

export default App;
