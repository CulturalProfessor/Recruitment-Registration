import React from "react";
import "./style.css";

export default function Redirect() {
  return (
    <div className="redirectContainer">
      <div className="formHeading">
        <img src="../osslogo.png" className="redirect_logo" alt="logo" />
        <h2 className="formHeadingElement">Team OSS</h2>
      </div>
      <h2>Thanks for Your Response</h2>
      <h2>Online registrations was a success, please visit our help desk for workshop payment</h2>
      <img src="/success.png" id="redirectImage" />
    </div>
  );
}