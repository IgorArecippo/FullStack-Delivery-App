import React from 'react';
import Provider from './contextAPI/Provider';
import Routes from './Routes/Routes';
import './App.css';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
