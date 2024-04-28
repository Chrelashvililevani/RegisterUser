import React from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import backgroundImage from './background.jpg';

function App() {
  return (
    <div className="App" style={{
      backgroundImage: `url(${backgroundImage})`,
      width: '100%',
      height: '100%',
      backgroundSize: 'contain'
    }}>
      <RegistrationForm />
    </div>
  );
}

export default App;
