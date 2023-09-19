import React from "react";
import "./style.css";

export default function Redirect() {
  return (
    <div className="redirectContainer">
      <div className="formHeading">
        <img src="/osslogo.png" className="redirectLogo" alt="logo" />
        <h1 className="formHeadingElement">Team OSS </h1>
      </div>
      <h1>Registrations have closed</h1>
      <h1>Thanks for your great response</h1>
      <img src="/success.svg" id="redirectImage" />
    </div>
  );
}
