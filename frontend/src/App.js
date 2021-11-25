import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Employees from './employees/index';
import { DataProvider } from './contexts/DataContext';
import { ImgProvider } from './contexts/ImgContext';

function App() {


  return (
    <div className="App">
      <DataProvider>
        <ImgProvider>
          <Employees />
        </ImgProvider>
      </DataProvider>
    </div>
  );
}

export default App;
