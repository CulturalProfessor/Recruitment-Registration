import React from "react";
import "./style.css";

export default function Redirect() {
  return (
    <div className="redirectContainer">
      <div className="formHeading">
        <img src="../osslogo.png" className="redirect_logo" alt="logo" />
        <h2 className="formHeadingElement">Team OSS & ACM AKGEC</h2>
        <img src="../acm_crop.png" className="redirect_acm_logo" alt="acm_logo" />
      </div>
      <h2>Thanks for Your Response</h2>
      <h2>Online registrations was a success, visit our help desk for workshop payment</h2>
      <img src="/success.svg" id="redirectImage" />
    </div>
  );
}
