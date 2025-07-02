
import './App.css';
import React from 'react';
import ImageUpload  from './components/ImageUpload';

function App() {
  return (
    <div className="App" style={{ padding:'2rem'}}>
      <h1> Face Detection & Analysis</h1>
      <ImageUpload/>
    </div>
  );
}

export default App;
