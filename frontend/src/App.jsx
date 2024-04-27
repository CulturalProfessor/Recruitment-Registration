import React from "react";
import FrontForm from "./components/FrontForm";
import "./App.css";
import InputField from "./components/InputField";
import InputForm from "./components/InputForm";

export default function App() {
  return (
    <div className="page">
      <div className="poster">
        <FrontForm />
      </div>
      <div className="field">
      <InputForm />
      </div>
        
      </div>

  );
}
