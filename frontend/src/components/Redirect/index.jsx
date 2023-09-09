import React from "react";
import "./style.css";

export default function Redirect() {
  return (
    <div className="redirectContainer">
      <div className="formHeading">
        <img src="../osslogo.png" className="logo" alt="logo" />
        <h1 className="formHeadingElement">Team OSS </h1>
      </div>
      <h1>You have successfully registered</h1>
      <h1>Welcome Aboard</h1>
      <img src="../public/success.svg" id="redirectImage" />
    </div>
  );
}
