import React from "react";
import InputField from "../InputField";
import "./style.css";

export default function FrontForm() {
  return (
    <div class="formbody">
      <img src="../osslogo.png" className="logo" alt="logo" />
      <div className="frontForm">
        <h1>OpenDevX</h1>
        <InputField />
      </div>
      <div class="leftside">
        <img src="../earth.png" className="earth" alt="earth" />
        <img src="../peoples.png" className="people" alt="people" />
      </div>
    </div>
  );
}
