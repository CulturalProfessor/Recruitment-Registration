import React from "react";
import FrontForm from "./components/FrontForm";
import Backform from "./components/Backform";
import "./App.css";

export default function App() {
  return (
    <div className="form">
      <div className="backForm">
        <Backform />
      </div>
      <div className="frontForm">
        <FrontForm />
      </div>
    </div>
  );
}
