import React from "react";
import "./App.css";
import Movies from "./components/Movies";
import {Route} from "react-router-dom";

function App() {
  return (
    <main className="container">
      <Movies />
    </main>
  );
}

export default App;
