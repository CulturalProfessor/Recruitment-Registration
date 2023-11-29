import React from "react";
import "./style.css";

export default function Redirect() {
  return (
    <div className="redirectContainer">
      <div className="formHeading">
        <img src="../osslogo.png" className="logo" alt="logo" />
        <h1 className="formHeadingElement">Team OSS & ACM AKGEC</h1>
        <img src="../acm_crop.png"/>
      </div>
      <h1>Thanks for Registration</h1>
      <h1>Confirmation mail will be sent.</h1>
      <img src="/success.svg" id="redirectImage" />
    </div>
  );
}
