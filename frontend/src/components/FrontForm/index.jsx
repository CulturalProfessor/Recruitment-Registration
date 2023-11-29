import React from "react";
import InputField from "../InputField";
import "./style.css";

export default function FrontForm() {
  return (
    <div className="formbody">
      <div className="formHeading">
        <img src="../osslogo.png" className="logo" alt="logo" />
        <h2 className="formHeadingElement">Team OSS & ACM AKGEC</h2>
        <img src="../acm_crop.png" className="acm_logo" alt="acm_logo"/>
      </div>
      <h3 className="formHeadingElement">Presents</h3>
      <h2 className="formHeadingElement tracking-in-expand ">Hour of Code 2.0</h2>
      <div className="eventDetailsContainer">
        <div className="eventDetails">
          <li className="list">
            <h3>5th December</h3>
          </li>
          <li className="list">
            <h3>4:00 PM - 7:00 PM</h3>
          </li>
        </div>
        <li className="list">
          <h3>4th Floor CS/IT Block</h3>
        </li>
        <h3 className="notice">Please register yourself on HackerRank College Mail ID before test</h3>
        <div className="kidsContainer">
          <img src="/kids.svg" alt="" id="kidsImage" />
          <InputField />
        </div>
      </div>
    </div>
  );
}
