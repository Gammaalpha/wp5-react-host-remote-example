import React from 'react';
import './App.css';
import { CustomButton } from "./components";
function App() {
  return (
    <div className="App">
      <div>
        Remote Component
      </div>
      <div>
        <CustomButton text={"Test"} />
      </div>
    </div>
  );
}

export default App;
