import React from "react";
import "./App.css";
import Pomodoro from "./pomodoro/Pomodoro";

function App() {
  return (
    <div className='App'>
      <header className='App-header container my-md-5 my-sm-3'>
        <h1>Pomodoro Timer</h1>
      </header>
      <div className='container'>
        <Pomodoro />
      </div>
    </div>
  );
}

export default App;
