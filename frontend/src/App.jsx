import React from "react";
import FrontForm from "./components/FrontForm";
import Background from "./components/Background";
import "./App.css";

export default function App() {
  return (
    <div className="mainPage">
      <div className="backForm">
        <Background />
      </div>
      <div className="frontForm">
        <FrontForm />
      </div>
    </div>
  );
}
