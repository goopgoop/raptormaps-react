import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapRender from './map/maprender';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <div>
    <ReactNotification />
    <MapRender />
    </div>
  );
}

export default App;
